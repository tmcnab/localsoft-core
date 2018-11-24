Authentication & Authorization
==============================

- Authentication consists of a simple email/password challenge
- User ID (`Person.Identifier`) is SHA1 Base64-encoded lowercase email
- Authorization is (currently) four access levels:
    1. Anonymous: only public-facing resources may be read, no write
    2. Member: public facing read, selected read on private, can comment
    3. Staff: public/private read/write
    4. Administrator: can manage other users

### TODO ###
- More granular roles model
- Account recovery
- First login process/questionnaire
