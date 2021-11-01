function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("input_value");
  let items = db.collection("Items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function getTodo() {
  db.collection("Items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    createItems(items);
  });
}

function createItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    itemsHTML += `
        <div  class="items">
            <div class="check">
                <div data-id="${item.id}" class="check_mark ${
      item.status == "completed" ? "selected" : ""
    }">
                <img src="#" alt="">
                </div>
            </div>
            <div class="todo_text  ${
              item.status == "completed" ? "selected" : ""
            }">
            ${item.text}
            </div>
        </div>
        `;
  });
  document.querySelector(".items_wrapper").innerHTML = itemsHTML;
  listen();
}
function listen() {
  let todoselector = document.querySelectorAll(".items .check_mark");
  todoselector.forEach((selector) => {
    selector.addEventListener("click", function () {
      selected(selector.dataset.id);
    });
  });
}
function selected(id) {
  let item = db.collection("Items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed",
        });
      } else if (status == "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}
function DelItem(data) {
  db.collection("Items").doc("data").delete();
}
getTodo();
