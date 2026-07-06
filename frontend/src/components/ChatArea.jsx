import { useState } from "react";
import AIBanner from "./AiBanner";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import MessageList from "./MessageList";
import Navbar from "./Navbar";


function ChatArea() {
  const [value, setValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const [banner,setBanner]=useState({
    open:false,
    title:"",
    message:""
  });
  return (
    <div className="flex-1 flex flex-col min-w-0">

      <Navbar />

      <MessageList setValue={setValue} setSelectedAgent={setSelectedAgent} />
      <AIBanner

   open={banner.open}

   title={banner.title}

   message={banner.message}

   onClose={()=>

      setBanner({
         ...banner,
         open:false
      })

   }

/>

     <ChatInput
       value={value}
       setValue={setValue}
       selectedAgent={selectedAgent}
       setSelectedAgent={setSelectedAgent}
       setBanner={setBanner}
     />

    </div>
  );
}

export default ChatArea;