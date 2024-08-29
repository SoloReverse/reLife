"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { TextareaHTMLAttributes, useRef, useState } from "react";
import { generate } from "./action";
import { readStreamableValue } from "ai/rsc";

export default function Page() {
  const [input, setInput] = useState<string>();
  const [generation, setGeneration] = useState("");
  const TextRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background w-full rounded-lg h-full mb-12 p-4">
        <p>{generation}</p>
      </div>
      <div className="flex flex-row h-20 py-4">
        <Textarea
          ref={TextRef}
          value={input}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.currentTarget.value);
          }}
          className="resize-none min-h-full max-h-full"
          placeholder="hello"
        ></Textarea>
        <Button
          variant="default"
          className="p-4 flex flex-col h-full ml-4 hover:scale-105 hover:bg-primary transition-all duration-500 ease-in-out"
          onClick={async () => {
            if (input && input?.length > 10) {
              const { output } = await generate(input);
              setInput("");
              setGeneration("");
              for await (const delta of readStreamableValue(output)) {
                setGeneration((generation) => `${generation}${delta}`);
              }
            }
          }}
        >
          <SendIcon />
          Send
        </Button>
      </div>
    </div>
  );
}
