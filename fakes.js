import faker from 'faker'

export function createTenant () {
	return {
		createdAt: faker.date.past(1),
		domain: `${faker.internet.domainWord()}.${faker.internet.domainSuffix()}`,
		id: faker.random.uuid(),
		roles: [],
		subdomain: faker.internet.domainWord(),
	}
}
