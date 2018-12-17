Authentication & Authorization
==============================

- Authentication consists of a simple email/password challenge
- User ID (`Person::identifier`) is just a v4 UUID
- Authorization is (currently) role based with four access levels:
    1. Anonymous: only public-facing resources may be read, no write
    2. Member: public facing read, selected read on private, can comment
    3. Staff: public/private read/write
    4. Administrator: can manage other users

### TODO ###
- More granular roles model
- Account recovery
- First login process/questionnaire
