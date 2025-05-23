// Function to create a showreel card
function createshowreelCard(title, company, time, thumbnail, description) {
    const card = document.createElement("div");
    card.classList.add("showreel-subpanel");

    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt = title;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("showreel-details");

    const titleElem = document.createElement("h2");
    titleElem.textContent = title;

    const companyElem = document.createElement("p");
    companyElem.textContent = company;
    companyElem.style.fontWeight = "bold"; // Inline style for bold text

    const timeElem = document.createElement("p");
    timeElem.textContent = time;
    timeElem.style.fontStyle = "italic"; // Inline style for italic text

    // Append text elements to the detailsDiv
    detailsDiv.appendChild(titleElem);
    detailsDiv.appendChild(companyElem);
    detailsDiv.appendChild(timeElem);

    // Create a new div for the description
    const descDiv = document.createElement("div");
    descDiv.classList.add("showreel-description");
    const descElem = document.createElement("p");
    descElem.textContent = description;
    descDiv.appendChild(descElem);

    // Create a container for the details and description
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("showreel-content");
    contentContainer.appendChild(detailsDiv);
    contentContainer.appendChild(descDiv);

    // Append img and contentContainer to the main card
    card.appendChild(img);
    card.appendChild(contentContainer);

    return card;
}

// Fetch and append showreel cards on DOM content load
document.addEventListener("DOMContentLoaded", async () => {
    const showreelsContainer = document.querySelector(".showreels-subpanels");
    if (!showreelsContainer) {
        console.error('showreels container not found');
        return;
    }

    try {
        const response = await fetch('../Config/showreels.txt');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const text = await response.text();
        const showreels = text.split('---').map(prod => prod.trim()).filter(prod => prod);

        const fragment = document.createDocumentFragment();

        showreels.forEach((prod, index) => {
            const lines = prod.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
            if (lines.length === 5) {
                const card = createshowreelCard(lines[0], lines[1], lines[2], lines[3], lines[4]);
                fragment.appendChild(card);
            } else {
                console.error(`Invalid showreel data format at index ${index}:`, lines);
            }
        });

        showreelsContainer.appendChild(fragment);
    } catch (error) {
        console.error('Failed to load showreels:', error);
    }
});