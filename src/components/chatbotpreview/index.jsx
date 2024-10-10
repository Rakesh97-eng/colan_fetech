import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatBotByIdApi } from "../../redux/action/adminAction";
import { adminSelector } from "../../redux/slice/adminSlice";

// const ChatBot = ({ chatData }) => {
//     const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//     const handleMessageResponse = (responseIndex) => {
//         const nextMessageIndex = chatData[currentMessageIndex]?.options?.[responseIndex]?.follow_up_index;
//         if (nextMessageIndex !== undefined) {
//             setCurrentMessageIndex(nextMessageIndex);
//         }
//     };

//     const currentMessage = chatData[currentMessageIndex];

//     return (
//         <div>
//             <div>{currentMessage?.message}</div>
//             {currentMessage.options.map((option, index) => (
//                 <button key={index} onClick={() => handleMessageResponse(index)}>
//                     {option.response}
//                 </button>
//             ))}
//             {currentMessage.follow_up_index !== undefined && (
//                 <ChatBot chatData={chatData} currentMessageIndex={currentMessage.follow_up_index} />
//             )}
//         </div>
//     );
// };

export const Recursivechat = ({ chats, id,show="true" }) => {
    const [previouschat, setPreviouschat] = useState([] );

  const [checkbutton, setCheckButton] = useState(id);
  const [message, setMessage] = useState('');
  const [showButtons, setShowButtons] = useState(show);

  const handleClick = (option) => {
    setCheckButton("");
    setShowButtons("true");
    setMessage(option);
  };

  useEffect(()=>{
   if(chats.follow_up.message && showButtons == "true") {
    let data = {message:chats.follow_up.message,option:chats.follow_up.options.map((option)=>option.response)}
    setPreviouschat([...previouschat,data])
    setShowButtons("false")
    setMessage(chats)
}
else{
    setMessage(chats)
}
    // setShowButtons(true);
  },[chats,showButtons])

  return (
//     <>
//     <div>{message?.follow_up?.message}</div>
//     {responses.map((response, index) => (
//         <div key={index}>Your response: {response}</div>
//       ))}
//     {showButtons && (
//       <>
//         {message?.follow_up?.options?.map((option, index) => (
//           <button key={index} onClick={() => handleClick(option)}>
//             {option.response}
//           </button>
//         ))}
//       </>
//     )}
//   </>
    <>

    {previouschat.length>2 && previouschat.map((previous,i)=>{
        return <div key={i}>
                    {previous.message}
                    {
                        previous.option.map((response)=>{
                            <button>{response}</button>
                        })
                    }
                
                </div>
    })}
      {checkbutton === "" ? (
        <>
          <h5 >{message?.follow_up?.message}</h5>
          {message?.follow_up?.options?.map((option, index) => {
            return (
                <Recursivechat key={index} chats={option} id="button" show="false" />
            );
          })}
        </>
      ) : (
        <>
            {/* {showButtons && <Recursivechat chats={previouschat}  />} */}
          {message?.response && <button onClick={()=>handleClick(message)}>{message?.response}</button>}
        </>
      )}
    </>
  );

};

const ChatBotPreview = () => {
  const [chat, setChat] = useState([]);
  const dispatch = useDispatch();

  const { getChatBotDataById } = useSelector(adminSelector);

  useEffect(() => {
    dispatch(getChatBotByIdApi(3));
  }, []);
  useEffect(() => {
    setChat(getChatBotDataById);
  }, [getChatBotDataById]);
  {
    /* {i ===0 && <div>{chats?.follow_up?.message}</div>} */
  }

  {
    /* {recursivechat(chats,"button")} */
  }
  return (
    <>
      {chat?.json_content?.options?.map((chats, i) => {
        return <Recursivechat key={i} chats={chats} id="" />;
      })}
      {/* <ChatBot chatData={chat} />; */}
    </>
  );
};

export default ChatBotPreview;
