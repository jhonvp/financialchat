const chatForm = document.querySelector("#sendEmail");
const chatMessages = document.querySelector("#emailTest");
const userList = document.querySelector("#users");
const chatMessagesArea = document.querySelector(".chat-messages");
const userIdSpan = document.querySelector("#userId");
const usernameSpan = document.querySelector("#username");
const roomSpan = document.querySelector("#room");
const statusSpan = document.querySelector("#status");
const closeSessionBtn = document.querySelector("#closeSession");

const socket = io();
let messages = [];
// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomMessages", ({ info }) => {
  if (info) {
    messages.push(...info.reverse());
  }
  outputMessages();
});

// Get room and users
socket.on("roomUsers", ({ users }) => {
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  if (message.isWelcomeMessage && message.isBotMessage) {
    userIdSpan.innerHTML = message.userData.id;
    usernameSpan.innerHTML = message.userData.username;
    roomSpan.innerHTML = message.userData.room;
    statusSpan.innerHTML = message.userData.status;
  }
  messages.push(message.messageData);
  outputMessages();
  // Scroll down
});

socket.on("disconnect", () => {
  alert("There was an error on the server.");
  document.location.href = "/";
});

// Message submit
chatForm.addEventListener("click", (e) => {
  e.preventDefault();

  // Get message text
  const msg = chatMessages.value;

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  chatMessages.value = "";
  chatMessages.focus();
});

closeSessionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.location.href = "/";
});

chatMessages.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // Get message text
    const msg = chatMessages.value;

    // Emit message to server
    socket.emit("chatMessage", msg);

    // Clear input
    chatMessages.value = "";
    chatMessages.focus();
  }
});

// Output message to DOM
function outputMessages() {
  const div = document.createElement("div");
  div.classList.add("incoming_msg");
  messages = messages.slice(-50);

  messagesHTML = messages.map((message) => {
    return `
    <div class="incoming_msg_img"> ${message.username} </div>
    <div class="received_msg">
        <div class="received_withd_msg">
            <p>${message.text}</p>
            <span class="time_date">${new Date(
              message.time
            ).toLocaleString()}</span>
        </div>
    </div>
  `;
  });
  div.innerHTML = messagesHTML.join("");
  chatMessagesArea.innerHTML = "";
  chatMessagesArea.appendChild(div);
  chatMessagesArea.focus();
  chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
  chatMessages.value = "";
  chatMessages.focus();
  chatMessages.focus();
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users
      .map(
        (user) => `<div class="chat_list">
    <div class="chat_people">
        <div class="chat_img"> ${user.room} </div>
        <div class="chat_ib">
            <h5>${user.username} <span class="chat_date">${new Date(
          user.time
        ).toLocaleString()} </span></h5>
            <p>${user._id}</p>
        </div>
    </div>
</div>`
      )
      .join("")}
  `;
}
