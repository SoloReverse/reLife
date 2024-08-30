"use server";

import Stripe from "stripe";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const { text, toolResults } = await generateText({
    model: openai("gpt-4o-mini"),
    system: ` You are a friendly assistant

    You are to assistant visitors of the website in making an order. You are not able to assist in anything other than making the order. Do not hallucinate. Anything not related to getting the order making information should be ignored respectfully and return the subject to the order.

    You will need to get the following information
    the product name they want, and it can be anything. The price they are willing to pay for it and it must be between 10 and 200 AED. and finally you will need to get their phone number. The phone number must be in international format. If it is not add the +971 after asking the customer if he is in the UAE. If he provides it in international format dont ask it. you will then call the tool. 

    The price amount the tool uses is in fils/cents. make sure to account for that and add extra zeros.
    
    `,
    messages: history,
    tools: {
      sendPaymentLink: {
        description: "Converts celsius to fahrenheit",
        parameters: z.object({
          phone: z.string().describe("The customers phone number"),
          product: z.string().describe("The products name"),
          price: z.string().describe("the price of the product"),
        }),
        execute: CreateRequestNotification,
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content:
          text ||
          toolResults
            .map((toolResult) =>
              toolResult.result == 200
                ? "Payment Link sent. Please check your phone"
                : "An error has occurred with the tool. Please contact the help line on WhatsApp"
            )
            .join("\n"),
      },
    ],
  };
}

export async function CreateRequestNotification({
  phone,
  product,
  price,
}: {
  phone: string;
  product: string;
  price: number;
}) {
  console.log(phone, product, price);
  const stripe = new Stripe(process.env.STRIPE_API_KEY);
  let productID: string;

  const search = await stripe.products.search({ query: `name:"${product}"` });
  if (search.data.length > 0) {
    productID = search.data[0].id;
    console.log("product found");
  } else {
    const productRes = await stripe.products.create({
      name: product,
      shippable: true,
    });
    console.log(`productID ${productRes.active}`);
    productID = productRes.id;
  }
  const priceRes = await stripe.prices.create({
    product: productID,
    currency: "aed",
    unit_amount: price,
  });
  console.log(`priceID ${priceRes.created}`);
  const linkRes = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceRes.id,
        quantity: 1,
      },
    ],
    restrictions: {
      completed_sessions: { limit: 1 },
    },
  });

  await fetch("https://graph.facebook.com/v20.0/375530342317386/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: process.env.PHONE,
      type: "template",
      template: {
        name: "relife_notification",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: phone }],
          },
        ],
      },
    }),
  });

  const res = await fetch(
    "https://graph.facebook.com/v20.0/375530342317386/messages",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: "request_relife",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: "Re.Life Alpha" },
                { type: "text", text: `${insertDecimal(price)} AED` },
                { type: "text", text: `000000001-${product}` },
                { type: "text", text: "Re.AE.03X" },
              ],
            },
            {
              type: "button",
              sub_type: "url",
              index: 0,
              parameters: [
                {
                  type: "text",
                  text: linkRes.url.replace("https://buy.stripe.com/", ""),
                },
              ],
            },
          ],
        },
      }),
    }
  );
  console.log(await res.json());
  return res.status;
}

function insertDecimal(number: number) {
  const numString = number.toString();
  const length = numString.length - 2;
  return `${numString.slice(0, length)}.${numString.slice(length)}`;
}
