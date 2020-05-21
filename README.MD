# Placeholder API

![stars](https://img.shields.io/github/stars/boxdox/placeholder-api?style=social)
![licence](https://img.shields.io/github/license/boxdox/placeholder-api")

A RESTful service for generating dummy text and placeholder images.
<br />Built with Express and TypeScript.

## Usage
### Dummy Text:
`GET` request on `/text` with optional Query Parameters:
  - **type**: `word`, `sentence` or `paragraph`. Defaults to `paragraph`.
  - **amount**: Number. Defaults to `3`.
  - **format**: `raw`, `html` or `json`. Defaults to `html`.

To generate 2 paragraphs in json, `GET /text?amount=5&format=json`, returns:

```
{
    "text": "Ullam adipiscing quasi ea perspiciatis nostrum aut. Anim voluptas unde laudantium iure do corporis rem. Nesciunt laboris amet excepteur, ipsa suscipit qui pariatur perspiciatis. Amet exercitation accusantium nisi ex. Id dolore inventore quaerat eum ut natus. Adipiscing nesciunt exercitation id unde, voluptas porro.\nQuae quia fugiat eius porro. Sit omnis duis cupidatat sunt consequat fugit aute. Nulla ad ex consectetur adipiscing pariatur sed aliquam. Adipiscing enim exercitationem autem nihil sit illo dolorem. Ex ullamco ullam sed laborum adipiscing, illo numquam. Amet adipiscing explicabo eu proident. Neque sequi occaecat est, nisi.",
    "count": "2 paragraphs, 89 words generated",
    "credits": "https://github.com/boxdox/placeholder-api",
    "support": "https://www.buymeacoffee.com/blamemycode"
}
```

### Dummy Image
Image take a different request approach. `GET` request on `/image/:width/:height?/:format?/?text=Your optional text`. In this, width parameter is required.

Route parameters:
- **width**: Number, required. Should be between 1 and 4000
- **height**: Number, optional. Should be between 1 and 4000. If not specified, it is set equal to width.
- **format**: `jpeg`, `png` or `bmp`, optional. Defaults to `jpeg`.

There is a query parameter as well, if you want to customize the text in the image:

- **text**: String, optional. Defaults to `width x height`

_Note: Due to an issue in `librsvg`, text centering and wrapping is not possible at the moment. I have approximated the text to be vertically centered, I will update the code once the library is fixed. You can read [about it here](https://github.com/lovell/sharp/issues/2106)._

### Getting Images
For a square image 300px wide, `GET /image/300`:

![300px placeholder](data:image/jpeg;base64,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)

To get a image of size 500x200 in png with text saying "Howdy!", `GET /image/500/200/png?text=Howdy!`:

![500x200 png saying Howdy!](
	data:image/png;base64,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
)

## Development
Fork the repo or clone it locally using:
```
git clone https://github.com/boxdox/placeholder-api.git
cd placeholder-api
```        

Rename (or make a copy) the `.env.sample` to `.env` and modify as per requirement:
```
cp .env.sample .env
```

Install the dependencies and start the development server:
```
yarn install
yarn dev
```    

Create a build by running:
```
yarn build
```      
    
### Deployment
You can either use a PaaS like `Heroku` or you can build the Docker image.

## Licence
MIT 2020