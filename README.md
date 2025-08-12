# Blog Post Manager

In this exercise, you will build a simple blog post manager using **Vanilla TypeScript** and **Vite**. The goal is not to create a fully-fledged blogging platform, but to practice DOM manipulation, events, _( local storage - extra )_, and basic styling.

Remember to create a vite project before you start. You can do it in this folder after you have cloned the repo _( If you choose to clone it.. )_. The new vite project will be in a subfolder to this project.

```bash
npm create vite@latest
```

Follow the steps, pick a name of the project _( will be the name of the subfolder that is created inside this repo )_ and choose **vanilla typescript**.

## 📌 Instructions

### ✅ Basics

- All blog posts should be displayed in a list on the page.

- There should be a form where users can add a new blog post with at least:

  - A **title**
  - A **body**
  - An **author**

- Each blog post should show:

  - The **title**
  - The **author**
  - The **content**
  - A **timestamp** (when it was created)

- Each blog post should have buttons to:

  - ✏️ **Edit** the post in place
  - 🗑️ **Delete** the post

- Style your application! Design matters in frontend development. But remember: it's usually best to finish the functionality or the styling first — don't do both at the same time.

---

### 🚀 More Complexity

- Allow **sorting** of blog posts by:

  - Timestamp (newest first – _default_)
  - Author (alphabetically)

- Blog posts should be **stored in local storage** and automatically loaded when the page is refreshed. Even if you close your browser and reopen it, the posts should still be there.

- Optionally, let users **filter posts** by author name.

- Use **textareas** for writing blog content to support multiline input.

## 🧰 Extra Stuff You Can Use

### 🖋️ Google Fonts

[Google fonts - Docs & Catalog](https://fonts.google.com/)

Browse the fonts, in order to use one in your application follow these steps:

1. Click on a font you like, [`Roboto`](https://fonts.google.com/specimen/Roboto) for instance.

2. Click the `Get font`-button and then the `Get embeded code`-button.

3. Make sure you're in the `Web`-tab and click on the `@import`-radio button

4. Cope the code inside the style-tags to the top of you css file and add the font-family to your html-tag

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  font-family: 'Roboto', serif;
}
```

This will set the default font-family on all the elements inside the html-tag. If you want a different font-family on certain elements you can just add those in different css-selectors.

### 🎨 Material Icons

[Material icons - Docs & Catalog](https://fonts.google.com/icons)

Browse the icons, in order to use them in your application follow these steps:

1. Copy this code and add it inside the head-tag on your HTML document.

```js
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
```

2. Pick an icon by clicking on it. A side meny should come in from the right.

3. Make sure you are on the `Web`-tab, scroll down to "Inserting the icon".

4. Copy the code and add it in your HTML document or your generated HTML code inside your js-files. Here is an example for a home icon:

```html
<span class="material-symbols-outlined"> home </span>
```

The class is what gives the icon its looks, and it comes from the link-tag you added earlier. The text "home" is the reference to the icon that is being retrieved from material icons.

Remember, that icons can be styled, you can change color and such things. You usually need some flex-styling on the parent element in order to be properly align the icon with the rest of the content inside the parent element.
