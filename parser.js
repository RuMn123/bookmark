// Bookmark parser for Chrome/Firefox HTML bookmarks file

// Main function to parse bookmarks from HTML file
function parseBookmarksHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Create container for parsed data
    const parsedData = [];
    
    // Get all DL elements (usually contain bookmark folders)
    const dlElements = doc.querySelectorAll('dl');
    
    // Process each DL element (folder)
    dlElements.forEach((dl, index) => {
        // Skip the first DL as it's usually the root
        if (index === 0) return;
        
        // Check if this DL has a preceding H3 (folder name)
        const prevH3 = dl.previousElementSibling;
        if (prevH3 && prevH3.tagName === 'H3') {
            const folderName = prevH3.textContent.trim();
            const categoryId = generateCategoryId(folderName);
            
            // Create category object
            const category = {
                id: categoryId,
                name: folderName,
                icon: getCategoryIcon(folderName),
                bookmarks: []
            };
            
            // Get all DT elements within this DL (bookmarks)
            const dtElements = dl.querySelectorAll('dt');
            
            // Process each DT element (bookmark)
            dtElements.forEach(dt => {
                const anchor = dt.querySelector('a');
                if (anchor) {
                    const name = anchor.textContent.trim();
                    const url = anchor.getAttribute('href');
                    
                    // Skip javascript: URLs and empty names
                    if (url && !url.startsWith('javascript:') && name) {
                        category.bookmarks.push({
                            name: name,
                            url: url,
                            favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`
                        });
                    }
                }
            });
            
            // Only add category if it has bookmarks
            if (category.bookmarks.length > 0) {
                parsedData.push(category);
            }
        }
    });
    
    return parsedData;
}

// Generate a category ID from the folder name
function generateCategoryId(folderName) {
    return folderName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

// Assign icons based on category name
function getCategoryIcon(categoryName) {
    const lowerName = categoryName.toLowerCase();
    
    const iconMap = {
        'tool': 'fas fa-tools',
        '工具': 'fas fa-tools',
        'ai': 'fas fa-robot',
        '人工智能': 'fas fa-robot',
        'dev': 'fas fa-code',
        '开发': 'fas fa-code',
        'media': 'fas fa-film',
        '媒体': 'fas fa-film',
        '视频': 'fas fa-film',
        'learn': 'fas fa-graduation-cap',
        '学习': 'fas fa-graduation-cap',
        'shop': 'fas fa-shopping-cart',
        '购物': 'fas fa-shopping-cart',
        'news': 'fas fa-newspaper',
        '新闻': 'fas fa-newspaper',
        'social': 'fas fa-users',
        '社交': 'fas fa-users',
        'game': 'fas fa-gamepad',
        '游戏': 'fas fa-gamepad',
        'travel': 'fas fa-plane',
        '旅行': 'fas fa-plane',
        'finance': 'fas fa-chart-line',
        '金融': 'fas fa-chart-line',
        'food': 'fas fa-utensils',
        '美食': 'fas fa-utensils',
        'health': 'fas fa-heartbeat',
        '健康': 'fas fa-heartbeat',
        'sport': 'fas fa-running',
        '运动': 'fas fa-running',
        'music': 'fas fa-music',
        '音乐': 'fas fa-music'
    };
    
    // Find matching icon or use default
    for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerName.includes(key)) {
            return icon;
        }
    }
    
    // Default icon
    return 'fas fa-bookmark';
}

// Function to update the UI with parsed bookmarks
function updateBookmarksUI(parsedData) {
    if (!parsedData || parsedData.length === 0) {
        console.error('No valid bookmark data provided');
        return;
    }
    
    // Update global bookmarkData
    window.bookmarkData = parsedData;
    
    // Refresh the UI
    generateBookmarkHTML();
}

// Function to handle file upload
function handleBookmarkFile(file) {
    if (!file || !file.name.endsWith('.html')) {
        alert('请上传有效的书签HTML文件');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
        try {
            const html = event.target.result;
            const parsedData = parseBookmarksHTML(html);
            
            if (parsedData && parsedData.length > 0) {
                updateBookmarksUI(parsedData);
                alert(`成功导入 ${parsedData.length} 个书签分类`);
            } else {
                alert('未能从文件中提取有效书签数据');
            }
        } catch (error) {
            console.error('解析书签文件时出错:', error);
            alert('解析书签文件时出错');
        }
    };
    
    reader.onerror = () => {
        alert('读取文件时出错');
    };
    
    reader.readAsText(file);
} 