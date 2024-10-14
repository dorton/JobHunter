const fs = require('fs');
const path = require('path');

const t = require('./fn/tag');
const h = require('./fn/htmlEscape');

const resumeCSS = fs.readFileSync(path.join(__dirname, 'resume.css'), {encoding: 'utf8'});
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), {encoding: 'utf8'}));

const LAYOUT_DEFAULT = [
    {
        id: "top",
        sections: [
        ]
    },
    {
        id: "left",
        sections: [
            "basics",
            "work",
            "education",
            "volunteer",
            "references"
        ]
    },
    {
        id: "right",
        sections: [
            "avatar",
            "contact",
            "languages",
            "certificates",
            "publications",
            "awards",
            "projects",
            "skills",
            "interests"
        ]
    }
]

const TITLES = {
    contact: "Contact",
    basicsEmail: "E-mail",
    basicsLocation: "Location",
    basicsPhone: "",
    basicsProfiles: "Profiles",
    basicsUrl: "URL",
    languages: "Languages",
    certificates: "Certificates",
    work: "Employment",
    education: "Education",
    projects: "Projects",
    volunteer: "Volunteering",
    publications: "Publications",
    awards: "Awards",
    skills: "Skills",
    interests: "Interests",
    references: "References"
};

const RENDERERS = {
    error: require('./section/error'),
    basics: require('./section/basics'),
    avatar: require('./section/avatar'),
    awards: require('./section/awards'),
    contact: require('./section/contact'),
    languages: require('./section/languages'),
    certificates: require('./section/certificates'),
    work: require('./section/work'),
    education: require('./section/education'),
    publications: require('./section/publications'),
    projects: require('./section/projects'),
    volunteer: require('./section/volunteer'),
    skills: require('./section/skills'),
    interests: require('./section/interests'),
    references: require('./section/references'),
};

function renderSection(resume, titles, sectionName) {
    console.log(`Rendering section: ${sectionName}`)
    const renderer = RENDERERS[sectionName] || RENDERERS.error;
    const result = renderer(resume, titles, sectionName);
    console.log(`Rendered: ${typeof result} ${typeof result === "string" ? result.length : ''}`)
    return result;
}


function render(resume) {
    const basics = resume.basics || {};
    const meta = resume.meta || {};
    const config = meta.extras || {};
    const layout = Array.isArray(config.layout) ? config.layout : LAYOUT_DEFAULT;
    const titles = Object.assign({}, TITLES, config.titles || {});
    const customCSS = Array.isArray(config.customCSS) ? config.customCSS.join("\n") : typeof config.customCSS === "string" ? config.customCSS : null;
    const fontFamily = config.fontFamily || 'Roboto Slab';
    const googleFontFamilyParam = config.googleFontFamilyParam || "Roboto+Slab:wght@200;400";
    return `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Resume - ${h(basics.name)}</title>
${meta.canonical ? `<link rel="canonical" href="${h(meta.canonical)}">` : ''}
${meta.lastModified ? `<meta http-equiv="Last-Modified" content="${h(meta.lastModified)}">` : ''}
${meta.version ? `<meta http-equiv="Version" content="${h(meta.version)}">` : ''}
<meta http-equiv="Generator" content="${packageJson.name} ${packageJson.version}">
<style>
@import url('https://fonts.googleapis.com/css2?family=${googleFontFamilyParam}&display=swap');
body {
    font-family: '${h(fontFamily)}', 'Gentium Book Basic', 'Gentium Plus', 'Gentium Basic', 'Times New Roman', 'Times', ui-serif, serif;
}
</style>
<style>${resumeCSS}</style>
${customCSS ? `<style>${h(customCSS)}</style>` : ''}
</head>
<body class="${resume.basics.image && resume.basics.image !== '' ? 'has-image' : ''}">
<article id="resume">
${layout.map(area => t(`section#${area.id}`, area.sections.map(sectionName => renderSection(resume, titles, sectionName)).join("\n"))).join("\n")}
</article>
</body>
</html>
    `.trim();
}

module.exports = {
    render: render,
};
