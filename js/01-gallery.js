import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryElement = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
        </a>
      </li>`
    )
    .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

galleryElement.innerHTML = addGalleryMarkup;
galleryElement.addEventListener("click", onImageClick);

function onImageClick(evt) {
  blockStandardAction(evt);
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" width="800" height="600">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeyPress);
      },
    }
  );
  instance.show();

  function onKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}

function blockStandardAction(evt) {
  evt.preventDefault();
}
