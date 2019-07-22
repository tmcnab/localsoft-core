export default {
    schema: `

    # A mailing address. Reference: https://schema.org/PostalAddress
    # TODO: addressCountry could be enforced with an enum
    type PostalAddress {
        # The country. For example, US (ISO 3166-1 alpha-2 country code).
        addressCountry: String
        # The locality. For example, Mountain View.
        addressLocality: String
        # The region. For example, CA.
        addressRegion: String
        # The postal code. For example, 94043.
        postalCode: String
        # The street address. For example, 1600 Amphitheatre Pkwy.
        streetAddress: String
    }

    # A mailing address input.
    input PostalAddressInput {
        # The country. For example, US (ISO 3166-1 alpha-2 country code).
        addressCountry: String
        # The locality. For example, Mountain View.
        addressLocality: String
        # The region. For example, CA.
        addressRegion: String
        # The postal code. For example, 94043.
        postalCode: String
        # The street address. For example, 1600 Amphitheatre Pkwy.
        streetAddress: String
    }

    `
}
