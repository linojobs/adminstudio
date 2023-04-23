function main() {
  const amznSSTextarea = document.getElementById("amzn-ss-image-textarea");
  const productTitle = document.getElementById("productTitle");
  const largeRadio = document.querySelector(
    "#amzn-ss-large-image-radio-button input"
  );
  const cats = document.querySelectorAll(
    "#wayfinding-breadcrumbs_feature_div a"
  );
  const priceEle = document.querySelector("[data-a-color=price]>.a-offscreen");
  if (!amznSSTextarea) {
    window.requestIdleCallback(main);
    return;
  }

  const value = amznSSTextarea.value;
  if (value.trim() === "") {
    window.requestIdleCallback(main);
    return;
  }

  const clickEvt = new MouseEvent("click", {
    target: largeRadio,
  });
  document.dispatchEvent(clickEvt);

  const catTags = [];
  for (let i = 0; i < cats.length; i++) {
    catTags.push(cats[i].innerText);
  }

  amznSSTextarea.setAttribute("disabled", "disabled");

  const btn = document.createElement("button");
  btn.innerText = "Save";
  btn.addEventListener("click", function () {
    this.disabled = true;
    this.innerText = "Saving...";
    // parser
    const div = document.createElement("div");
    div.innerHTML = amznSSTextarea.value;
    const link = div.firstElementChild.getAttribute("href");
    const image = div.firstElementChild.firstElementChild.getAttribute("src");
    const hideImg =
      div.firstElementChild.nextElementSibling.getAttribute("src");

    const spec = new URL(link);
    const linkId = spec.searchParams.get("linkId");
    const title = productTitle.innerText;
    const price = priceEle.innerText;
    const fd = new URLSearchParams();
    fd.append("APP", "ChromeExt");
    fd.append("CONTROLLER", "AddItem");
    fd.append("title", title);
    fd.append("linkId", linkId);
    fd.append("link", link);
    fd.append("image", image);
    fd.append("hideImg", hideImg);
    fd.append("tags", catTags.join(","));
    fd.append("price", price);
    const data = {
      data: fd.toString(),
      url: "http://127.0.0.1:8080/api.php",
    };
    chrome.runtime.sendMessage(data, function (res) {
      btn.disabled = false;
      btn.innerText = "Save";
      console.log(res);
    });
  });

  amznSSTextarea.insertAdjacentElement("afterend", btn);
}

window.requestIdleCallback(main);
