import { posts } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { userPosts } from "../index.js";
import { formatDistanceToNow } from "https://esm.sh/date-fns@2.29.3";
import { ru } from "https://esm.sh/date-fns@2.29.3/locale";

export function renderAccountPage() {
  console.log(userPosts)

  userPosts.forEach((userPost) => {
      const createdAt = new Date(userPost.createdAt);

      const formattedDate = formatDistanceToNow(createdAt, {
        addSuffix: true,
        locale: ru,
      });

      const likesAuthor = userPost.likes.length > 0 ? userPost.likes[0].name : "";

      const likesNumber =
        userPost.likes.length > 1 ? " ещё " + (userPost.likes.length - 1) : "";

      let userHeader = document.querySelector(".posts-user-header");

      userHeader.innerHTML = `
        <img src="${userPost.user?.imageUrl}" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">${userPost.user?.name}</p>
      `;

      let post = document.createElement("li");
      post.classList.add("post");

      post.innerHTML = `
      <div class="post-image-container">
        <img src="${userPost.imageUrl}" class="post-image">
      </div>
      <div class="post-likes">
       <button class="like-button" data-post-id = "userPost.id">
       <img src="./assets/images/like-not-active.svg">
       </button>
       <p class="post-likes-text"> Нравится:
          ${likesAuthor ? `<strong>${likesAuthor}</strong>` : `<strong>0</strong>`}
          ${likesNumber ? ` и <strong>${likesNumber}</strong>` : ""}</p>
      </div>
      <p class="post-text"><span class="user-name">${userPost.user?.name}</span> ${userPost.description}</p>
      <p class="post-date">${formattedDate}</p>          
    `;

      let posts = document.querySelector(".posts");

      posts.append(post);
    });
}