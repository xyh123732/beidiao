
const artworks = [
    {
        id: 1,
        name: "花鸟贝雕",
        category: "花鸟",
        material: "天然贝壳、木质底板",
        description: "以贝壳天然的光泽和纹理表现花鸟形象，体现传统工艺对细节与层次的追求。",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600"
    },
    {
        id: 2,
        name: "山水贝雕",
        category: "山水",
        material: "贝壳、装饰底板",
        description: "借助不同材质的色泽与层次表现山水意境，展现传统装饰艺术的审美特色。",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
    },
    {
        id: 3,
        name: "人物贝雕",
        category: "人物",
        material: "天然贝壳、木质底板",
        description: "以细致的造型表现人物形象，让观众通过作品了解传统工艺的造型语言。",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600"
    },
    {
        id: 4,
        name: "花卉纹样",
        category: "花鸟",
        material: "贝壳、装饰底板",
        description: "围绕花卉纹样进行装饰设计，体现传统工艺对自然形态的观察与提炼。",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
    },
    {
        id: 5,
        name: "山海意境",
        category: "山水",
        material: "天然贝壳、复合底板",
        description: "以自然景观为灵感进行艺术化表达，适合用于数字展示平台的作品浏览演示。",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600"
    },
    {
        id: 6,
        name: "传统人物纹样",
        category: "人物",
        material: "贝壳、装饰底板",
        description: "通过人物纹样展示传统工艺的构图方式和装饰特点。",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600"
    },

    {
        id: 7,
        name: "牡丹花贝雕",
        category: "花鸟",
        material: "天然贝壳、装饰底板",
        description: "以牡丹花为主题，展示传统装饰工艺对花卉形态和细节的表现。",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
    }

];
const artworkList = document.getElementById("artworkList");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const emptyMessage = document.getElementById("emptyMessage");
const detailDialog = document.getElementById("detailDialog");
const detailContent = document.getElementById("detailContent");
const closeDialog = document.getElementById("closeDialog");

// 把作品数据转换成网页卡片
function renderArtworks(list) {
    artworkList.innerHTML = "";

    emptyMessage.hidden = list.length > 0;

    list.forEach(function (artwork) {
        const card = document.createElement("article");
        card.className = "artwork-card";

        card.innerHTML = `
            <img
                class="artwork-image"
                src="${artwork.image}"
                alt="${artwork.name}"
            >
            <div class="artwork-info">
                <span class="category-tag">${artwork.category}</span>
                <h3>${artwork.name}</h3>
                <p>${artwork.description}</p>
                <button class="detail-button" data-id="${artwork.id}">
                    查看作品详情
                </button>
            </div>
        `;

        artworkList.appendChild(card);
    });
}

// 根据关键词和类别筛选作品
function filterArtworks() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    console.log("当前搜索词：", keyword);
    console.log("当前选择类别：", category);
    const result = artworks.filter(function (artwork) {
        const matchesKeyword =
            artwork.name.toLowerCase().includes(keyword) ||
            artwork.description.toLowerCase().includes(keyword) ||
            artwork.category.toLowerCase().includes(keyword);

        const matchesCategory =
            category === "全部" || artwork.category === category;
console.log(
    artwork.name,
    "搜索匹配：", matchesKeyword,
    "类别匹配：", matchesCategory
);
       return matchesKeyword && matchesCategory;
    });
console.log("筛选结果数量：", result.length);
    renderArtworks(result);
}

// 点击作品按钮后显示详情
artworkList.addEventListener("click", function (event) {
    const button = event.target.closest(".detail-button");

    if (!button) {
        return;
    }


    const id = Number(button.dataset.id);
    const artwork = artworks.find(function (item) {
        return item.id === id;
    });

    if (!artwork) {
        return;
    }

    detailContent.innerHTML = `
        <h2>${artwork.name}</h2>
        <p><strong>类别：</strong>${artwork.category}</p>
        <p><strong>材料：</strong>${artwork.material}</p>
        <p><strong>作品介绍：</strong>${artwork.description}</p>
    `;

    detailDialog.showModal();
});

// 关闭详情
closeDialog.addEventListener("click", function () {
    detailDialog.close();
});

// 监听用户操作
searchInput.addEventListener("input", filterArtworks);
categorySelect.addEventListener("change", filterArtworks);

// 页面加载时展示全部作品
console.log(artworks.length);
renderArtworks(artworks);
