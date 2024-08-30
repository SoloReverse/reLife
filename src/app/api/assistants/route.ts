// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// const openai = new OpenAI();

// export async function DELETE(request: Request) {
//   const auth = request.headers.get("api_key");
//   if (auth != process.env.SECRET_API) {
//     return NextResponse.json({ error: "not authenticated" }, { status: 401 });
//   } else {
//     const assistants = await openai.beta.assistants.list();
//     if (assistants.data.length > 0) {
//       return NextResponse.json({
//         code: 0,
//         message: "No active assistants found",
//         deleted: 0,
//       });
//     } else {
//       let count = 0;
//       assistants.data.forEach(async (assistant) => {
//         if (assistant.created_at > Date.now() + 30 * 60 * 1000) {
//           count++;
//           await openai.beta.assistants.del(assistant.id);
//         }
//       });
//       return NextResponse.json({
//         code: 1,
//         message: "Successfully deleted active assistants",
//         deleted: count,
//       });
//     }
//   }
// }
