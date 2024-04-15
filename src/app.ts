showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

/*
Патерн "Спостерігач"
Створіть інтерфейс Observer з методом update(data: any): void.
Створіть клас Subject, який буде володіти списком об'єктів, які слухають його зміни. Має методи subscribe(observer: Observer): void і unsubscribe(observer: Observer): void.
В класі Subject додайте метод notify(data: any): void, який викликає метод update для всіх підписаних об'єктів.
Створіть клас, який реалізує інтерфейс Observer і має внутрішній стан. Наприклад, StockObserver зі змінною stockPrice.
Перевірте роботу, підписавши об'єкти на зміни в Subject і спостерігаючи, як вони отримують оновлення.
 */

interface Observer {
    update(data: any): void;
}

class Subject {
    private observers: Observer[] = [];

    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: any): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

class StockObserver implements Observer {
    private stockPrice: number = 0;

    constructor(private name: string) {}

    update(data: any): void {
        if (typeof data === 'number') {
            this.stockPrice = data;
            console.log(`${this.name} отримав оновлення. Нова ціна акцій: ${this.stockPrice}`);
        }
    }
}

const subject = new Subject();

const observer1 = new StockObserver('Спостерігач 1');
const observer2 = new StockObserver('Спостерігач 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify(100);

/*
Патерн "Стратегія"
Створіть інтерфейс PaymentStrategy, який міститиме метод pay(amount: number): void.
Реалізуйте кілька класів, які реалізують цей інтерфейс, наприклад, CreditCardPaymentStrategy, PaypalPaymentStrategy, BitcoinPaymentStrategy, кожен з них має відповідний метод pay.
Створіть клас PaymentContext, який має властивість paymentStrategy типу PaymentStrategy.
Додайте метод executePayment(amount: number): void в клас PaymentContext, який викликає метод pay відповідної стратегії.
 */

interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPaymentStrategy implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Оплата ${amount} грн за допомогою кредитної картки`);
    }
}

class PaypalPaymentStrategy implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Оплата ${amount} грн за допомогою Paypal`);
    }
}

class BitcoinPaymentStrategy implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Оплата ${amount} грн за допомогою Bitcoin`);
    }
}

class PaymentContext {
    private _paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this._paymentStrategy = paymentStrategy;
    }

    get paymentStrategy(): PaymentStrategy {
        return this._paymentStrategy;
    }

    set paymentStrategy(strategy: PaymentStrategy) {
        this._paymentStrategy = strategy;
    }

    executePayment(amount: number): void {
        if (amount <= 0) {
            throw new Error("Сумма платежа должна быть положительным числом.");
        }
        this._paymentStrategy.pay(amount);
    }
}

const paymentContext = new PaymentContext(new CreditCardPaymentStrategy());
paymentContext.executePayment(500);

paymentContext.paymentStrategy = new BitcoinPaymentStrategy();
paymentContext.executePayment(700);

