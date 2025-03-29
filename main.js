// espera que a arvore fique pronta para poder chamar todos os arquivos htmls
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

// aplica os textos em todos os elementos dos htmls verificando se sao validos antes
// garantindo tambem que a funcao de digitar os textos somente rode quando os elementos
// foram carregados
function aplicarTextos() {
	const title = document.getElementById("title");
	const aboutButton = document.getElementById("aboutButton");
	const socialMediaButton = document.getElementById("socialMediaButton")
	const sectionTitle = document.getElementById("sectionTitle");
	const aboutTitle = document.getElementById("aboutTitle");
	const aboutBody = document.getElementById("aboutBody");
	const aboutFormationTitle = document.getElementById("aboutFormationTitle");
	const aboutFormationBody = document.getElementById("aboutFormationBody");
	const footerText = document.getElementById("footerText");

	if (title) title.textContent = STRINGS.title;
	if (aboutButton) aboutButton.textContent = STRINGS.aboutButtonText;
	if (socialMediaButton) socialMediaButton.textContent = STRINGS.socialMediaButtonText;
	if (sectionTitle) sectionTitle.textContent = STRINGS.sectionTitle;
	if (aboutTitle) aboutTitle.textContent = STRINGS.aboutTitle;
	if (aboutBody) aboutBody.textContent = STRINGS.aboutBody;
	if (aboutFormationTitle) aboutFormationTitle.textContent = STRINGS.aboutFormationTitle;
	if (aboutFormationBody) aboutFormationBody.textContent = STRINGS.aboutFormationBody;

	if (footerText) footerText.textContent = STRINGS.footer;

	if (aboutButton) {
		aboutButton.addEventListener("click", () => {
			aboutBody.scrollIntoView({ behavior: "smooth" });
		});
	}
}

// faz o efeito de digitar o texto com uma velocidade especifica
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