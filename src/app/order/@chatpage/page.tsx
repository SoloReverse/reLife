"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Bot, SendIcon, User } from "lucide-react";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import { generate } from "./action";
import { readStreamableValue } from "ai/rsc";
import Markdown from "react-markdown";
import {
  continueConversation,
  CreateRequestNotification,
  Message,
} from "@/app/api/notifications/action";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [input, setInput] = useState<string>("");
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [generation, setGeneration] = useState<Message[]>([]);
  const TextRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && autoScroll) {
      // Calculate the height to scroll past the end
      const scrollHeight = chatContainer.scrollHeight;
      const clientHeight = chatContainer.clientHeight;
      const scrollPosition = scrollHeight - clientHeight;

      // Adjust scroll position to scroll a bit past the end
      chatContainer.scrollTo({
        top: scrollPosition + 100, // 50px of extra space
        behavior: "instant",
      });
    }
  }, [generation]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    //@ts-ignore
    chatContainer.addEventListener("scroll", function () {
      //@ts-ignore
      if (chatContainer?.scrollTop < chatContainer?.scrollHeight - 1000) {
        setAutoScroll(false);
      }
    });
    chatContainer?.addEventListener("touchmove", function (e) {
      setAutoScroll(false);
    });
  }, [chatContainerRef.current?.scrollHeight]);

  return (
    <div className="relative flex flex-col h-full justify-between pb-12 mb-4">
      <div
        ref={chatContainerRef}
        className="w-full lg:mb-4 overflow-scroll pb-12 scrollbar-hide p-6"
      >
        {generation.map((message) => {
          if (message.role == "assistant") {
            return (
              <div className="ltr:pr-12 rtl:pl-12 ltr:mr-6 rtl:ml-6 ltr:lg:mr-48 rtl:lg:ml-48 rounded-lg p-4 py-6 scroll-pb-48 line">
                <Bot className="mb-4" />
                <Markdown
                  className={"text-sm leading-relaxed"}
                  components={{
                    hr(props) {
                      return <br></br>;
                    },
                    li(props) {
                      return <li>{props.children}</li>;
                    },
                  }}
                >
                  {message.content}
                </Markdown>
              </div>
            );
          } else {
            return (
              <div className="ltr:pl-12 rtl:pr-12 ltr:ml-6 rtl:mr-6 ltr:lg:ml-48 rtl:lg:mr-48 rounded-lg p-4 py-6 scroll-pb-48 line mb-4 flex flex-col items-end min-w-12">
                <User className="mb-4 mr-2" />
                <Markdown
                  className={
                    "text-sm leading-relaxed bg-primary/10 rounded-xl p-4"
                  }
                  components={{
                    hr(props) {
                      return <br></br>;
                    },
                    li(props) {
                      return <li>{props.children}</li>;
                    },
                  }}
                >
                  {message.content}
                </Markdown>
              </div>
            );
          }
        })}
      </div>
      <div className="fixed bottom-6 items-center w-[95%] self-center flex flex-col">
        {!autoScroll && (
          <Button
            onClick={() => {
              //@ts-ignore
              chatContainerRef.current.scrollTo({
                //@ts-ignore
                top: chatContainerRef.current?.scrollHeight + 50, // 50px of extra space
                behavior: "instant",
              });
              setAutoScroll(true);
            }}
            variant={"ghost"}
            className="rounded-full w-8 h-8 bg-white border-neutral-800 p-2 mb-2"
          >
            <ArrowDown />
          </Button>
        )}
        <div className="flex flex-row h-12 w-full items-center">
          <Input
            //@ts-ignore
            ref={TextRef}
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            className="resize-none min-h-full max-h-full rounded-2xl w-full"
            placeholder="hello"
          ></Input>
          <Button
            variant="default"
            className="p-4 flex flex-col h-full ltr:ml-4 rtl:mr-4 hover:scale-105 hover:bg-primary transition-all duration-500 ease-in-out"
            onClick={async () => {
              setGeneration([...generation, { role: "user", content: input }]);
              setInput("");
              const { messages } = await continueConversation([
                ...generation,
                { role: "user", content: input },
              ]);
              setGeneration(messages);
            }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
