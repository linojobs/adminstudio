chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch(request.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: request.data,
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then(sendResponse)
    .catch(sendResponse);
  return true;
});
