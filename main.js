// Wait for the DOM tree to be ready before loading all HTML includes
document.addEventListener("DOMContentLoaded", async () => {
	await loadIncludes(document);
	applyTexts();
	typeText(18);
});

async function loadIncludes(root) {
	const includes = root.querySelectorAll('[data-include]');

	for (const el of includes) {
		try {
			const file = el.getAttribute("data-include");
			const response = await fetch(file);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const content = await response.text();
			el.innerHTML = content;

			// Process nested includes inside the newly loaded content
			await loadIncludes(el);
		} catch (error) {
			console.error("Error loading include:", error);
		}
	}
}

// Apply text content from STRINGS to all elements, ensuring
// the typewriter effect only starts after elements are loaded
function applyTexts() {
	const title = document.getElementById("title");
	const sectionText = document.getElementById("sectionText");
	const aboutButton = document.getElementById("aboutButton");
	const educationButton = document.getElementById("educationButton");
	const socialMediaButton = document.getElementById("socialMediaButton");
	const portfolioButton = document.getElementById("portfolioButton");
	const sectionTitle = document.getElementById("sectionTitle");
	const aboutTitle = document.getElementById("aboutTitle");
	const aboutBody = document.getElementById("aboutBody");
	const educationTitle = document.getElementById("educationTitle");
	const educationBody = document.getElementById("educationBody");
	const portfolioTitle = document.getElementById("portfolioTitle");
	const portfolioBody = document.getElementById("portfolioBody");
	const footerText = document.getElementById("footerText");

	if (title) title.textContent = STRINGS.title;
	if (sectionText) sectionText.textContent = STRINGS.sectionText;
	if (aboutButton) aboutButton.textContent = STRINGS.aboutButtonText;
	if (educationButton) educationButton.textContent = STRINGS.educationButtonText;
	if (socialMediaButton) socialMediaButton.textContent = STRINGS.socialMediaButtonText;
	if (portfolioButton) portfolioButton.textContent = STRINGS.portfolioTitle;
	if (sectionTitle) sectionTitle.textContent = STRINGS.sectionTitle;
	if (aboutTitle) aboutTitle.textContent = STRINGS.aboutTitle;
	if (aboutBody) aboutBody.textContent = STRINGS.aboutBody;
	if (educationTitle) educationTitle.textContent = STRINGS.educationTitle;
	if (educationBody) educationBody.textContent = STRINGS.educationBody;
	if (portfolioTitle) portfolioTitle.textContent = STRINGS.portfolioTitle;
	if (portfolioBody) portfolioBody.textContent = STRINGS.portfolioBody;
	if (footerText) footerText.textContent = STRINGS.footer;

	if (aboutButton)
		aboutButton.addEventListener("click", toogleContainer("aboutContainer"));

	if (educationButton)
		educationButton.addEventListener("click", toogleContainer("educationContainer"));

	if (portfolioButton)
		portfolioButton.addEventListener("click", toogleContainer("portfolioContainer"));
}

function toogleContainer(containerId) {
	return () => {
		const container = document.getElementById(containerId);
		if (container) {
			container.classList.toggle("open");
			if (container.classList.contains("open")) {
				container.scrollIntoView({ behavior: "smooth" });
			}
		}
	}
}

// Typewriter effect with configurable speed
function typeText(velocity) {
	const texto = STRINGS.subtitle;
	const elemento = document.getElementById("typewriter");
	let resultado = "";

	function escrever() {
		for (let i = 0; i < texto.length; i++) {
			setTimeout(() => {
				resultado += texto[i];
				elemento.textContent = resultado;
			}, i * velocity);
		}
	}

	escrever();
}