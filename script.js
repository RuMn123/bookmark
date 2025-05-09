// Define the bookmark categories and their respective links
// This would ideally be generated from your bookmarks file
const bookmarkData = [
    {
        id: 'tools',
        name: '常用工具',
        icon: 'fas fa-tools',
        bookmarks: [
            { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
            { name: '谷歌', url: 'https://www.google.com', favicon: 'https://www.google.com/favicon.ico' },
            { name: '微信', url: 'https://weixin.qq.com', favicon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico' },
            { name: '腾讯文档', url: 'https://docs.qq.com', favicon: 'https://docs.qq.com/favicon.ico' },
            { name: '有道翻译', url: 'https://fanyi.youdao.com', favicon: 'https://fanyi.youdao.com/favicon.ico' }
        ]
    },
    {
        id: 'ai',
        name: 'AI工具',
        icon: 'fas fa-robot',
        bookmarks: [
            { name: 'ChatGPT', url: 'https://chat.openai.com', favicon: 'https://chat.openai.com/favicon.ico' },
            { name: '文心一言', url: 'https://yiyan.baidu.com', favicon: 'https://yiyan.baidu.com/favicon.ico' },
            { name: 'Claude', url: 'https://claude.ai', favicon: 'https://claude.ai/favicon.ico' },
            { name: 'Midjourney', url: 'https://www.midjourney.com', favicon: 'https://www.midjourney.com/favicon.ico' },
            { name: 'Hugging Face', url: 'https://huggingface.co', favicon: 'https://huggingface.co/favicon.ico' }
        ]
    },
    {
        id: 'develop',
        name: '开发资源',
        icon: 'fas fa-code',
        bookmarks: [
            { name: 'GitHub', url: 'https://github.com', favicon: 'https://github.com/favicon.ico' },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com', favicon: 'https://stackoverflow.com/favicon.ico' },
            { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', favicon: 'https://developer.mozilla.org/favicon.ico' },
            { name: 'CodePen', url: 'https://codepen.io', favicon: 'https://codepen.io/favicon.ico' },
            { name: 'VSCode', url: 'https://code.visualstudio.com', favicon: 'https://code.visualstudio.com/favicon.ico' }
        ]
    },
    {
        id: 'media',
        name: '媒体娱乐',
        icon: 'fas fa-film',
        bookmarks: [
            { name: '哔哩哔哩', url: 'https://www.bilibili.com', favicon: 'https://www.bilibili.com/favicon.ico' },
            { name: '腾讯视频', url: 'https://v.qq.com', favicon: 'https://v.qq.com/favicon.ico' },
            { name: '优酷', url: 'https://www.youku.com', favicon: 'https://www.youku.com/favicon.ico' },
            { name: '网易云音乐', url: 'https://music.163.com', favicon: 'https://music.163.com/favicon.ico' },
            { name: 'YouTube', url: 'https://www.youtube.com', favicon: 'https://www.youtube.com/favicon.ico' }
        ]
    },
    {
        id: 'learning',
        name: '学习资源',
        icon: 'fas fa-graduation-cap',
        bookmarks: [
            { name: 'Coursera', url: 'https://www.coursera.org', favicon: 'https://www.coursera.org/favicon.ico' },
            { name: 'edX', url: 'https://www.edx.org', favicon: 'https://www.edx.org/favicon.ico' },
            { name: '中国大学MOOC', url: 'https://www.icourse163.org', favicon: 'https://www.icourse163.org/favicon.ico' },
            { name: 'Khan Academy', url: 'https://www.khanacademy.org', favicon: 'https://www.khanacademy.org/favicon.ico' },
            { name: 'W3Schools', url: 'https://www.w3schools.com', favicon: 'https://www.w3schools.com/favicon.ico' }
        ]
    }
];

// Function to generate HTML for bookmark categories
function generateBookmarkHTML() {
    const container = document.getElementById('bookmark-container');
    container.innerHTML = ''; // Clear existing content
    
    // If no bookmarks data is available, use the default
    const data = window.bookmarkData || bookmarkData;
    
    data.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category';
        categoryEl.id = category.id;
        
        // Create category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
        
        // Create category content
        const categoryContent = document.createElement('div');
        categoryContent.className = 'category-content';
        
        // Add bookmark items
        category.bookmarks.forEach(bookmark => {
            const bookmarkItem = document.createElement('a');
            bookmarkItem.className = 'bookmark-item';
            bookmarkItem.href = bookmark.url;
            bookmarkItem.target = '_blank';
            bookmarkItem.rel = 'noopener noreferrer';
            
            // Create bookmark content
            bookmarkItem.innerHTML = `
                <img class="bookmark-icon" src="${bookmark.favicon}" alt="${bookmark.name} icon" onerror="this.src='https://www.google.com/s2/favicons?domain=${bookmark.url}'">
                <span class="bookmark-name">${bookmark.name}</span>
            `;
            
            categoryContent.appendChild(bookmarkItem);
        });
        
        // Assemble the category element
        categoryEl.appendChild(categoryHeader);
        categoryEl.appendChild(categoryContent);
        container.appendChild(categoryEl);
    });
}

// Function to implement search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search term is empty, show all bookmarks
            document.querySelectorAll('.category').forEach(category => {
                category.style.display = 'block';
            });
            document.querySelectorAll('.bookmark-item').forEach(bookmark => {
                bookmark.style.display = 'flex';
            });
            return;
        }
        
        // Hide/show categories and bookmarks based on search
        const data = window.bookmarkData || bookmarkData;
        
        data.forEach(category => {
            const categoryEl = document.getElementById(category.id);
            if (!categoryEl) return;
            
            let hasVisibleBookmarks = false;
            
            // Check each bookmark in the category
            category.bookmarks.forEach((bookmark, index) => {
                const bookmarkItems = categoryEl.querySelectorAll('.bookmark-item');
                if (index >= bookmarkItems.length) return;
                
                const bookmarkItem = bookmarkItems[index];
                
                if (bookmark.name.toLowerCase().includes(searchTerm) || 
                    bookmark.url.toLowerCase().includes(searchTerm)) {
                    bookmarkItem.style.display = 'flex';
                    hasVisibleBookmarks = true;
                } else {
                    bookmarkItem.style.display = 'none';
                }
            });
            
            // Show/hide category based on if it has matching bookmarks
            categoryEl.style.display = hasVisibleBookmarks ? 'block' : 'none';
        });
    }
    
    // Set up event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    generateBookmarkHTML();
    setupSearch();
});

// Function to parse bookmarks from HTML file
// This would be used if you're able to upload your bookmarks_2025_5_6.html file
function parseBookmarksFile(html) {
    // This is a placeholder function
    // You would need to implement parsing logic specific to your bookmarks format
    console.log('Parsing bookmarks file...');
}

// Optional: Drag and drop functionality for bookmark file
function setupFileUpload() {
    const dropArea = document.body;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Add visual feedback for drag events
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        document.querySelector('.file-upload').classList.add('highlight');
    }
    
    function unhighlight() {
        document.querySelector('.file-upload').classList.remove('highlight');
    }
    
    // Handle the drop
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            const file = files[0];
            if (file.name.endsWith('.html')) {
                handleBookmarkFile(file);
            } else {
                alert('请上传书签HTML文件');
            }
        }
    }
} 