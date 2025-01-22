class TwintApp:
    def __init__(self):
        self.balance = 100.00  # Startguthaben
        self.transactions = []  # Liste der Transaktionen

    def show_balance(self):
        print(f"Dein aktueller Kontostand: CHF {self.balance:.2f}")

    def send_money(self, recipient, amount):
        if amount > self.balance:
            print("Nicht genug Guthaben, um die Transaktion durchzuführen.")
        elif amount <= 0:
            print("Bitte gib einen gültigen Betrag ein.")
        else:
            self.balance -= amount
            self.transactions.append(f"Gesendet: CHF {amount:.2f} an {recipient}")
            print(f"CHF {amount:.2f} erfolgreich an {recipient} gesendet.")

    def show_transactions(self):
        if not self.transactions:
            print("Keine Transaktionen verfügbar.")
        else:
            print("Transaktionsverlauf:")
            for t in self.transactions:
                print(f"- {t}")

def main():
    app = TwintApp()
    while True:
        print("\nWillkommen bei TWINT!")
        print("1. Kontostand anzeigen")
        print("2. Geld senden")
        print("3. Transaktionen anzeigen")
        print("4. Beenden")
        choice = input("Wähle eine Option: ")

        if choice == "1":
            app.show_balance()
        elif choice == "2":
            recipient = input("Empfängername: ")
            try:
                amount = float(input("Betrag (CHF): "))
                app.send_money(recipient, amount)
            except ValueError:
                print("Bitte gib einen gültigen Betrag ein.")
        elif choice == "3":
            app.show_transactions()
        elif choice == "4":
            print("Danke, dass du TWINT benutzt hast!")
            break
        else:
            print("Ungültige Option. Bitte wähle erneut.")

if __name__ == "__main__":
    main()