export const saveChatHistory = (messages) => {
  localStorage.setItem("chatHistory", JSON.stringify(messages));
};

export const getChatHistory = () => {
  const history = localStorage.getItem("chatHistory");
  return history ? JSON.parse(history) : [];
};

export const clearChatHistory = () => {
  localStorage.removeItem("chatHistory");
};
