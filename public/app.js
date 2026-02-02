const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("messages");

const appendMessage = (content, role) => {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
};

const setLoading = (isLoading) => {
  input.disabled = isLoading;
  form.querySelector("button").disabled = isLoading;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  appendMessage(text, "user");
  input.value = "";
  setLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (!response.ok) {
      appendMessage(data.error || "服务异常，请稍后再试。", "assistant");
    } else {
      appendMessage(data.reply || "抱歉，未能获得回复。", "assistant");
    }
  } catch (error) {
    console.error(error);
    appendMessage("网络连接失败，请检查后再试。", "assistant");
  } finally {
    setLoading(false);
  }
});
