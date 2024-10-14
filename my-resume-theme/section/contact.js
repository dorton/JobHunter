const t = require('../fn/tag');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const u = require('../fn/humanUrl');
const l = require('../fn/linkify');
const img = require('../fn/imgTag');

module.exports = function renderContact(resume, titles) {
    const basics = resume.basics || {};
    const location = basics.location || {};
    return `
        <section id="contact" class="list">
                ${t('h1#basics-contact', titles.contact)}
            ${basics.url ? `
                <section id="person-url">
                    ${t('h2#basics-url', titles.basicsUrl)}
                    ${img('url', 'URL', 'icon', resume)}
                    ${l(u(basics.url), basics.url, 'person-url-a')}
                </section>
            ` : ''}
            ${basics.email ? `
                <section id="person-email">
                    ${t('h2#basics-email', titles.basicsEmail)}
                    ${img('email', 'E-mail', 'icon', resume)}
                    ${l(basics.email, `mailto:${basics.email}`, 'person-email-a')}
                </section>
            ` : ''}
            ${basics.phone ? `
                <section id="person-phone">
                    ${t('h2#basics-phone', titles.basicsPhone)}
                    ${img('phone', 'Phone', 'icon', resume)}
                    ${t('p.person-phone-number', basics.phone)}
                </section>
            ` : ''}
            ${location ? `
                <section id="person-location">${j([
        t('h2#basics-location', titles.basicsLocation),
        img('location', 'Location', 'icon', resume),
        t('main.person-location-parts', j([
            t('span.person-location-address', location.address),
            t('span.person-location-postalCode', location.postalCode),
            t('span.person-location-city', location.city),
            t('span.person-location-region', location.region),
            t('span.person-location-countryCode', location.countryCode)
        ])),
    ])}</section>
            ` : ''}
            ${a(basics.profiles, 'section', 'div', 'profile', t('h2#basics-profiles', titles.basicsProfiles), p => l(`
                    ${t(`span.profile-network.profile-network-${p.network}`, p.network)}
                    ${img(p.network, p.network, 'icon', resume)}
                    ${t('span.profile-username', p.username)}
                `, p.url, 'profile-url')
    )}
        </section>
    `.trim();
}
