"""simple auth method for examples."""


def exampleAuth():
    accountID, token = None, None
    with open("/home/shubham/Downloads/pirate_arbbot-main/src/account.txt") as I:
        accountID = I.read().strip()
    with open("/home/shubham/Downloads/pirate_arbbot-main/src/token.txt") as I:
        token = I.read().strip()
    return accountID, token
