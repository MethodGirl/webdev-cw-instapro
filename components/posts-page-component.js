import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "https://esm.sh/date-fns@2.29.3";
import { ru } from "https://esm.sh/date-fns@2.29.3/locale";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postsList = document.createElement("ul");
  postsList.classList.add("posts");

  const appHtml = posts.map((post, index) => {
    const createdAt = new Date(post.createdAt);

    const formattedDate = formatDistanceToNow(createdAt, {
      addSuffix: true,
      locale: ru,
    });

    return `
                  <li class="post">
                    <div class="post-header" data-user-id="${index}">
                        <img src="${post.user?.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user?.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${index}"  class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post?.likes?.name}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post?.user.name}</span>
                      ${post?.description}
                    </p>
                    <p class="post-date">
                     ${formattedDate}
                    </p>
                  </li> `;
  });

  postsList.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  let headerContainer = document.querySelector(".header-container");

  headerContainer.append(postsList);

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
