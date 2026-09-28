import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let pageHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        
        <h3 class="form-title">Добавить пост</h3><div class="form-inputs">
          <div class="upload-image-container">    
          </div>
          <label class = "page-label">
            Опишите фотографию:
            <textarea class="input textarea input-textarea" rows="4"></textarea>
            </label>
            <button class="button add-photo-button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = pageHtml;

    let headerContainer = document.querySelector(".header-container");

    renderHeaderComponent({ element: headerContainer });

    let uploadImagContainer = document.querySelector(".upload-image-container");

    let imageUrl = "";

    renderUploadImageComponent({
      element: uploadImagContainer,
      onImageUrlChange: (url) => {
        imageUrl = url;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      let textAreaValue = document.querySelector(".input-textarea").value;

      onAddPostClick({
        description: textAreaValue,
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
