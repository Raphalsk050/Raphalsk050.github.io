document.addEventListener("DOMContentLoaded", async () => {
	const includes = document.querySelectorAll('[data-include]');

	for (const el of includes) {
		const file = el.getAttribute("data-include");
		const response = await fetch(file);
		const content = await response.text();
		el.innerHTML = content;
	}

	aplicarTextos();
	digitarTexto();
});

function aplicarTextos() {
	const title = document.getElementById("title");
	const button = document.getElementById("button");
	const sectionTitle = document.getElementById("sectionTitle");
	const sectionText = document.getElementById("sectionText");
	const footerText = document.getElementById("footerText");

	if (title) title.textContent = STRINGS.title;
	if (button) button.textContent = STRINGS.buttonText;
	if (sectionTitle) sectionTitle.textContent = STRINGS.sectionTitle;
	if (sectionText) sectionText.textContent = STRINGS.sectionText;
	if (footerText) footerText.textContent = STRINGS.footer;

	if (button && document.getElementById("about")) {
		button.addEventListener("click", () => {
			document.getElementById("about").scrollIntoView({ behavior: "smooth" });
		});
	}
}

function digitarTexto() {
	const texto = STRINGS.subtitle;
	const elemento = document.getElementById("typewriter");
	let i = 0;
	let resultado = "";

	function escrever() {
		for (let i = 0; i < texto.length; i++) {
			setTimeout(() => {
				resultado += texto[i];
				elemento.textContent = resultado;
			}, i * 30);
		}
	}

	escrever();
}

