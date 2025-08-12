import './style.css'

interface BlogPost {
  id: string;
  title: string;
  author: string;
  body: string;
  timestamp: Date;
}

let posts: BlogPost[] = [];
let currentEditingId: string | null = null;

const elements = {
  form: () => document.getElementById('blog-form') as HTMLFormElement,
  titleInput: () => document.getElementById('title') as HTMLInputElement,
  authorInput: () => document.getElementById('author') as HTMLInputElement,
  bodyInput: () => document.getElementById('body') as HTMLTextAreaElement,
  submitBtn: () => document.querySelector('button[type="submit"]') as HTMLButtonElement,
  sortSelect: () => document.getElementById('sort-by') as HTMLSelectElement,
  authorFilter: () => document.getElementById('author-filter') as HTMLInputElement,
  clearFilterBtn: () => document.getElementById('clear-filter') as HTMLButtonElement,
  postsContainer: () => document.getElementById('posts-container') as HTMLDivElement,
  noPosts: () => document.getElementById('no-posts') as HTMLDivElement
};

const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const formatDate = (date: Date): string => 
  date.toLocaleString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

const saveToStorage = (): void => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

const loadFromStorage = (): void => {
  const stored = localStorage.getItem('blogPosts');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      posts = parsed.map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp)
      }));
    } catch (error) {
      console.error('Error loading posts:', error);
      posts = [];
    }
  }
};

const createPost = (title: string, author: string, body: string): void => {
  const post: BlogPost = {
    id: crypto.randomUUID(),
    title,
    author,
    body,
    timestamp: new Date()
  };
  posts.unshift(post);
  saveToStorage();
};

const updatePost = (id: string, title: string, author: string, body: string): void => {
  const post = posts.find(p => p.id === id);
  if (post) {
    Object.assign(post, { title, author, body });
    saveToStorage();
  }
};

const deletePost = (id: string): void => {
  if (confirm('Är du säker på att du vill ta bort detta inlägg?')) {
    posts = posts.filter(post => post.id !== id);
    saveToStorage();
    renderPosts();
  }
};

const resetForm = (): void => {
  elements.form().reset();
  elements.submitBtn().innerHTML = `<span class="material-symbols-outlined">add</span> Create Post`;
  document.getElementById('cancel-edit')?.remove();
  currentEditingId = null;
};

const fillForm = (post: BlogPost): void => {
  elements.titleInput().value = post.title;
  elements.authorInput().value = post.author;
  elements.bodyInput().value = post.body;
  
  elements.submitBtn().innerHTML = `<span class="material-symbols-outlined">edit</span> Update Post`;
  
  if (!document.getElementById('cancel-edit')) {
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.id = 'cancel-edit';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.innerHTML = `<span class="material-symbols-outlined">cancel</span> Cancel`;
    cancelBtn.onclick = resetForm;
    
    elements.submitBtn().parentNode?.insertBefore(cancelBtn, elements.submitBtn().nextSibling);
  }
};

const editPost = (id: string): void => {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  
  currentEditingId = id;
  fillForm(post);
  
  document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
};

const getFilteredAndSortedPosts = (): BlogPost[] => {
  const filterText = elements.authorFilter().value.toLowerCase();
  const sortBy = elements.sortSelect().value;
  
  let filtered = filterText 
    ? posts.filter(post => post.author.toLowerCase().includes(filterText))
    : [...posts];
  
  return filtered.sort((a, b) => 
    sortBy === 'author' 
      ? a.author.localeCompare(b.author)
      : b.timestamp.getTime() - a.timestamp.getTime()
  );
};

const createPostHTML = (post: BlogPost): string => `
  <article class="post" data-id="${post.id}">
    <header class="post-header">
      <h3 class="post-title">${escapeHtml(post.title)}</h3>
      <div class="post-meta">
        <span class="post-author">By ${escapeHtml(post.author)}</span>
        <span class="post-date">${formatDate(post.timestamp)}</span>
      </div>
    </header>
    <div class="post-content">
      ${escapeHtml(post.body).replace(/\n/g, '<br>')}
    </div>
    <footer class="post-actions">
      <button onclick="editPost('${post.id}')" class="btn btn-secondary btn-small">
        <span class="material-symbols-outlined">edit</span> Edit
      </button>
      <button onclick="deletePost('${post.id}')" class="btn btn-danger btn-small">
        <span class="material-symbols-outlined">delete</span> Delete
      </button>
    </footer>
  </article>
`;

const renderPosts = (): void => {
  const filteredPosts = getFilteredAndSortedPosts();
  const container = elements.postsContainer();
  const noPostsEl = elements.noPosts();
  
  if (filteredPosts.length === 0) {
    container.innerHTML = '';
    noPostsEl.style.display = 'block';
  } else {
    noPostsEl.style.display = 'none';
    container.innerHTML = filteredPosts.map(createPostHTML).join('');
  }
};

const handleSubmit = (e: Event): void => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const body = formData.get('body') as string;

  if (currentEditingId) {
    updatePost(currentEditingId, title, author, body);
  } else {
    createPost(title, author, body);
  }
  
  resetForm();
  renderPosts();
};

const clearFilter = (): void => {
  elements.authorFilter().value = '';
  renderPosts();
};

(window as any).editPost = editPost;
(window as any).deletePost = deletePost;

const init = (): void => {
  loadFromStorage();
  
  elements.form().addEventListener('submit', handleSubmit);
  elements.sortSelect().addEventListener('change', renderPosts);
  elements.authorFilter().addEventListener('input', renderPosts);
  elements.clearFilterBtn().addEventListener('click', clearFilter);
  
  renderPosts();
};

document.addEventListener('DOMContentLoaded', init);
