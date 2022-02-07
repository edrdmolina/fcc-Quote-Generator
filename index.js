const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

const quoteURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        quotes: [],
        quote: '',
        author: '',
        color: ''
      }

      this.getQuotes = this.getQuotes.bind(this);
      this.getQuote = this.getQuote.bind(this);
      this.getColor = this.getColor.bind(this);
    }

    async componentDidMount() {
        await this.getQuotes();
        this.getQuote();
    }
    
    async getQuotes() {
        try {
            const res = await axios.get(quoteURL);
            this.setState({
                quotes: res.data.quotes
            })
        } catch (err) {
            console.error(err)
        }
    }

    getQuote() {
        const { quotes } = this.state;
        const randomNumber = Math.floor(Math.random() * quotes.length);
        this.setState({
            quote: quotes[randomNumber].quote,
            author: quotes[randomNumber].author,
        })
        this.getColor();
    }

    getColor() {
        const randomNumber = Math.floor(Math.random() * colors.length);
        this.setState({
            color: colors[randomNumber]
        })
    }

    render() {
        const { color } = this.state;
        const { getQuote } = this;
        return (
            <div className='App' style={{ backgroundColor: color }}>
                < QuoteBox {...this.state} getQuote={getQuote} />
            </div>
        )
    }
}

class QuoteBox extends React.Component {    
    render() {
        const { quote, author, color, getQuote } = this.props;
        return (
            <div id='quote-box'>
                <div className='quote-container' style={{ color: color }}>
                    <p id='text'>
                    <i className="fas fa-quote-left"/> { quote }</p>
                    <p id='author'>- { author }</p>
                </div>
                <div className='buttons-container'>
                    <a href={`https://www.twitter.com/intent/tweet?text=${quote}`}
                        target='_top'
                        className='btn'
                        id='tweet-quote'
                        style={{ backgroundColor: color }} >
                        <i className="fab fa-twitter" />
                    </a>
                    <button 
                        className='btn'
                        id='new-quote' 
                        onClick={getQuote}
                        style={{ backgroundColor: color }}
                    >New quote</button>
                </div>
            </div>
        )
    }
}

  ReactDOM.render(< App />, document.getElementById('root'));