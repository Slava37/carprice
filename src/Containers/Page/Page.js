import React, {Component} from 'react'
import classes from './Page.module.css'
import Card from '../../Components/Card/Card'
import data from '../../data'
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

class Page extends Component {

    state = {
        cards: [],
        card: {title: "", attributes: [], description: ""},
        currentAtribute: "",
        titleIsEmpty: true,
        inputTouched: false,
        isListFormat: false
    };


    componentDidMount() {
        this.setState({cards: data.data});
    }

    onSubmitHandler = (evt) => {
        evt.preventDefault()
    };

    pushCardHandler = () => {
        if (this.state.cards.length === 0) {
            return;
        }

        let firstCard = {...this.state.cards[0]};
        this.setState({cards: [...this.state.cards, firstCard]});
    };

    popCardHandler = () => {
        let cards = [...this.state.cards];
        cards.pop();
        this.setState({cards: cards});
    };

    shiftCardHandler = () => {
        let cards = [...this.state.cards];
        cards.shift();
        this.setState({cards: cards});
    };

    unshiftCardHandler = () => {
        if (this.state.cards.length === 0) {
            return;
        }

        let lastCard = {...this.state.cards[this.state.cards.length - 1]};
        this.setState({cards: [lastCard, ...this.state.cards]});
    };

    createNewCardHandler = () => {
        if (this.state.titleIsEmpty) {
            this.setState({inputTouched: true})
            return;
        }

        let cards = [...this.state.cards];
        cards.push(this.state.card);

        this.setState({cards: cards});
    };

    addPointHandler = () => {
        if(!this.state.currentAtribute || this.state.currentAtribute === ""){
            return;
        }

        let card = {...this.state.card};
        card.attributes.push(this.state.currentAtribute);

        this.setState({card: card});
    };

    changeHandler = (value, prop) => {


        if (prop === "currentAtribute") {
            this.setState({...this.state, currentAtribute: value});
        } else {

            let card = {...this.state.card};
            card[prop] = value;

            this.setState({
                ...this.state,
                card: card,
                inputTouched: true,
                titleIsEmpty: !value || value === ""
            });
        }

    };

    render() {
        const headerForm = (<form onSubmit={this.onSubmitHandler}>
            <Button
                type="primary"
                onClick={this.unshiftCardHandler}
            >
                Добавить в начало
            </Button>
            <Button
                type="primary"
                onClick={this.pushCardHandler}
            >
                Добавить в конец
            </Button>
            <Button
                type="primary"
                onClick={this.shiftCardHandler}
            >
                Удалить первый
            </Button>
            <Button
                type="primary"
                onClick={this.popCardHandler}
            >
                Удалить последний
            </Button>
        </form>);

        const footerForm = (<form onSubmit={this.onSubmitHandler}>
            <Input
                label="Заголовок*"
                value={this.state.card.title}
                onChange={evt => this.changeHandler(evt.target.value, "title")}
                notify={this.state.titleIsEmpty && this.state.inputTouched
                && <span className={classes.DangerNotify}>Введите заголовок</span>}
            />
            <Input
                label="Добавить пункт"
                value={this.state.currentAtribute}
                onChange={evt => this.changeHandler(evt.target.value, "currentAtribute")}
                notify={<div>
                <span className={classes.AttributesLabel}>
                Пункты для добавления:</span> {this.state.card.attributes.join(", ")}
                </div>}
            />
            <Input
                label="Описание"
                value={this.state.card.description}
                onChange={evt => this.changeHandler(evt.target.value, "description")}
            />
            <Button
                type="primary"
                onClick={this.addPointHandler}
            >
                Добавить пункт
            </Button>
            <Button
                type="primary"
                onClick={this.createNewCardHandler}
            >
                Добавить обьект
            </Button>
        </form>);

        return (
            <div className={classes.Page}>
                <div className={classes.Header}>
                    {headerForm}
                </div>
                <div className={classes.TitleCards}>
                    <hr></hr>
                    <div>
                        <span>Список объектов</span>
                        <div>
                            <Button
                                type="primary"
                                onClick={() => this.setState({isListFormat: true})}
                            >
                                Показать списком
                            </Button>
                            <Button
                            type="primary"
                            onClick={() => this.setState({isListFormat: false})}
                        >
                            Показать таблицей
                        </Button>
                        </div>
                    </div>
                    <hr></hr>
                    <i className="fa fa-bars"></i>
                </div>

                <div className={classes.CardsContainer}>
                    {this.state.cards.map((item, idx) =>
                        <Card key={idx}
                              index={idx + 1}
                              title={item.title}
                              attributes={item.attributes}
                              description={item.description}
                              isListFormat={this.state.isListFormat}
                        />)}
                </div>
                <hr></hr>
                <div className={classes.Footer}>
                    {footerForm}
                </div>
            </div>
        )
    }
}

export default Page;