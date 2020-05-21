# Placeholder API

![stars](https://img.shields.io/github/stars/boxdox/placeholder-api?style=social)
![licence](https://img.shields.io/github/license/boxdox/placeholder-api)

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

![300px placeholder](https://user-images.githubusercontent.com/19517445/82559396-2fa11000-9b8d-11ea-9651-042fd56c945d.jpg)

To get a image of size 500x200 in png with text saying "Howdy!", `GET /image/500/200/png?text=Howdy!`:

![500x200 png saying Howdy!](https://user-images.githubusercontent.com/19517445/82559388-2dd74c80-9b8d-11ea-9592-051a76c8cdba.png)

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

To build the docker image, run:
```
chmod +x ./build-docker.sh
./build-docker.sh
```

## Licence
MIT 2020
