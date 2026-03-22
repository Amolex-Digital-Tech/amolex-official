export type PortfolioShape =
  | { type: "image"; src: string; x: number; y: number; w: number; h: number; opacity?: number | null }
  | { type: "text"; text: string; x: number; y: number; w: number; h: number; font?: string | null; size?: number | null; color?: string | null; align?: "left" | "center" | "right" | "justify" | null; italic?: boolean | null; bold?: boolean | null };

export type PortfolioSlide = { id: number; shapes: PortfolioShape[] };

export const portfolioSlides: PortfolioSlide[] = 
[
  {
    "id": 1,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 3.7371,
        "y": 5.5633,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 0.5631,
        "y": 26.9219,
        "w": 98.8739,
        "h": 54.0448,
        "text": "PORTFOLIO",
        "font": "Anton",
        "size": 433.83,
        "color": "#AA212E",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 12.3805,
        "y": 18.0789,
        "w": 75.2391,
        "h": 49.6683,
        "text": "Project",
        "font": "Brittany",
        "size": 397.91,
        "color": "#F5841F",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 26.5096,
        "y": 14.1083,
        "w": 88.75,
        "h": 66.8583,
        "src": "/portfolio/media/image5.png",
        "opacity": 0.58
      }
    ]
  },
  {
    "id": 2,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 3.1387,
        "y": 5.7369,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 86.8092,
        "y": 72.6318,
        "w": 8.6143,
        "h": 15.232,
        "src": "/portfolio/media/image6.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 79.5019,
        "y": 73.8829,
        "w": 4.6811,
        "h": 12.7297,
        "src": "/portfolio/media/image7.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 64.1567,
        "y": 75.7484,
        "w": 12.9372,
        "h": 10.3087,
        "src": "/portfolio/media/image8.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 54.4289,
        "y": 73.7651,
        "w": 7.3319,
        "h": 13.0345,
        "src": "/portfolio/media/image9.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 60.6801,
        "y": 89.623,
        "w": 15.8948,
        "h": 7.8426,
        "src": "/portfolio/media/image10.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 79.3648,
        "y": 89.623,
        "w": 10.4325,
        "h": 9.2115,
        "src": "/portfolio/media/image11.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 5.625,
        "y": 24.9641,
        "w": 56.5439,
        "h": 28.8408,
        "text": "PORTFOLIO",
        "font": "Anton",
        "size": 231.4,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 5.625,
        "y": 19.0459,
        "w": 46.7093,
        "h": 13.3956,
        "text": "About This",
        "font": "Brittany",
        "size": 106.67,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 52.3343,
        "y": 56.6046,
        "w": 44.1423,
        "h": 12.9013,
        "text": "TRUSTED BY",
        "font": "Braggadocio",
        "size": 93.32,
        "color": "#AA212E",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 65.0732,
        "y": 48.4259,
        "w": 46.7093,
        "h": 13.3951,
        "text": "Companies",
        "font": "Brittany",
        "size": 106.67,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 5.625,
        "y": 61.7188,
        "w": 40.0338,
        "h": 15.2037,
        "text": "We craft strategies that connect brands with their audience and tell their story with impact. Through creative content, targeted advertising, and strategic social media management, we help businesses grow, engage, and leave a lasting impression.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#000000",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 47.9751,
        "y": -15.2806,
        "w": 88.75,
        "h": 65.2806,
        "src": "/portfolio/media/image12.png",
        "opacity": null
      }
    ]
  },
  {
    "id": 3,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 5.4502,
        "h": 7.9012,
        "src": "/portfolio/media/image13.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 1.9948,
        "y": 3.1648,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 40.6893,
        "y": 22.3569,
        "w": 56.5439,
        "h": 28.8408,
        "text": "HIGHLIGHTS",
        "font": "Anton",
        "size": 231.4,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 40.6893,
        "y": 14.7846,
        "w": 46.7093,
        "h": 13.392,
        "text": "Our Project",
        "font": "Brittany",
        "size": 106.67,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 48.5397,
        "y": 78.2528,
        "w": 16.9645,
        "h": 2.9815,
        "text": "Projects completed to date",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 78.7394,
        "y": 78.2528,
        "w": 13.0762,
        "h": 2.9815,
        "text": "Client Satisfaction Rate",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 40.6893,
        "y": 72.9557,
        "w": 11.1146,
        "h": 12.4645,
        "text": "15+",
        "font": "Anton",
        "size": 100.23,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 67.0007,
        "y": 72.9557,
        "w": 11.1146,
        "h": 12.4645,
        "text": "90%",
        "font": "Anton",
        "size": 100.23,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 90.2596,
        "y": 87.9907,
        "w": 4.1154,
        "h": 3.5556,
        "text": "02",
        "font": "Glacial Indifference Italic",
        "size": 27.99,
        "color": "#242424",
        "align": "right",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 61.8604,
        "y": -61.7172,
        "w": 60.9137,
        "h": 80.0,
        "src": "/portfolio/media/image14.png",
        "opacity": 0.36
      }
    ]
  },
  {
    "id": 4,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 10.0239,
        "h": 7.4019,
        "src": "/portfolio/media/image15.jpeg",
        "opacity": null
      },
      {
        "type": "text",
        "x": 18.3769,
        "y": 61.6818,
        "w": 56.5439,
        "h": 35.0353,
        "text": "SOCIAL MEDIA MARKETING",
        "font": "Anton",
        "size": 138.08,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 8.9959,
        "y": 48.0556,
        "w": 46.7093,
        "h": 17.5681,
        "text": "Lunar Interiors",
        "font": "Brittany",
        "size": 141.32,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 15.4386,
        "w": 27.1748,
        "h": 27.4259,
        "text": "Lunar Interior Services specializes in designing modern offices and workspaces for medium enterprises. Ghion Marketing Solutions enhanced their social media presence through creative content and targeted marketing campaigns.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 51.9614,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Client: Lunar Interiors",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 57.2744,
        "w": 27.1748,
        "h": 12.1481,
        "text": "Objective: LTo increase brand awareness and engagement for Lunar Interior Services by showcasing their modern office and workspace designs across social media platforms.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 73.052,
        "w": 27.1748,
        "h": 9.0926,
        "text": "Our Role: We created and managed engaging social media content to highlight their projects and attract clients.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 83.274,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Duration: 3 months",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 69.6843,
        "y": 88.0513,
        "w": 27.1748,
        "h": 6.037,
        "text": "Result: Over 500,000 birr revenue and more than 90,000hr watching time",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": -42.5368,
        "y": 60.8123,
        "w": 60.9137,
        "h": 80.0,
        "src": "/portfolio/media/image14.png",
        "opacity": 0.36
      }
    ]
  },
  {
    "id": 5,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 6.0629,
        "h": 6.1225,
        "src": "/portfolio/media/image16.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 1.8462,
        "y": 4.3641,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": -9.4298,
        "y": 60.4815,
        "w": 39.8628,
        "h": 45.7769,
        "src": "/portfolio/media/image17.jpeg",
        "opacity": null
      },
      {
        "type": "text",
        "x": 0.8114,
        "y": 17.7643,
        "w": 98.3773,
        "h": 28.7703,
        "text": "BRANDING PROJECT",
        "font": "Anton",
        "size": 231.4,
        "color": "#AA212E",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 9.3667,
        "y": 7.963,
        "w": 81.2666,
        "h": 18.4631,
        "text": "Lunar Interiors",
        "font": "Brittany",
        "size": 147.99,
        "color": "#F5841F",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 20.7422,
        "y": 46.7963,
        "w": 51.7589,
        "h": 2.9815,
        "text": "A complete branding and marketing package.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 35.5321,
        "y": 70.3333,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Client: Aurora Property Group",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 35.5321,
        "y": 82.5907,
        "w": 20.7559,
        "h": 6.037,
        "text": "Our Role: Brand Strategy, Visual Identity, Marketing Materials, Website",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 35.5321,
        "y": 75.6296,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Duration: 15 days",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 38.9456,
        "y": -22.4657,
        "w": 88.75,
        "h": 65.2806,
        "src": "/portfolio/media/image12.png",
        "opacity": null
      }
    ]
  },
  {
    "id": 6,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 5.4165,
        "h": 6.9832,
        "src": "/portfolio/media/image18.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 44.6065,
        "y": 79.3548,
        "w": 10.787,
        "h": 19.057,
        "src": "/portfolio/media/image19.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 61.6871,
        "y": 79.3548,
        "w": 10.2491,
        "h": 18.1979,
        "src": "/portfolio/media/image20.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 78.2383,
        "y": 78.7158,
        "w": 10.5957,
        "h": 18.8369,
        "src": "/portfolio/media/image21.jpeg",
        "opacity": null
      },
      {
        "type": "text",
        "x": 40.7774,
        "y": 26.737,
        "w": 56.5439,
        "h": 36.726,
        "text": "SOCIAL MEDIA MARKETING",
        "font": "Anton",
        "size": 206.07,
        "color": "#242424",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 40.7774,
        "y": 11.3166,
        "w": 46.7093,
        "h": 13.3918,
        "text": "Majestic Trading PLc",
        "font": "Brittany",
        "size": 106.67,
        "color": "#F5841F",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 40.7774,
        "y": 70.3393,
        "w": 52.0686,
        "h": 6.037,
        "text": "Majestic Trading PLC is a leading interior design and furniture company that creates stylish and functional spaces for homes and offices.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 3.3866,
        "y": 7.9847,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Client: Majestic Trading PLC",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 3.3866,
        "y": 12.5377,
        "w": 26.837,
        "h": 9.0926,
        "text": "Objective: Increase brand visibility and engagement for Majestic Trading PLC\u2019s interior design and furniture services.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 3.3866,
        "y": 24.338,
        "w": 26.837,
        "h": 9.0926,
        "text": "Our Role: We managed social media, created engaging content, and ran targeted advertising campaigns to reach a wider audience.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 3.3866,
        "y": 36.1158,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Duration: 4 months",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 3.3866,
        "y": 41.7825,
        "w": 26.837,
        "h": 12.1481,
        "text": "Result: Our campaigns generated over 500k ad views and 45,000 hours of total view time, significantly boosting brand awareness and audience engagement.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 90.2596,
        "y": 87.9907,
        "w": 4.1154,
        "h": 3.5556,
        "text": "05",
        "font": "Glacial Indifference Italic",
        "size": 27.99,
        "color": "#242424",
        "align": "right",
        "italic": false,
        "bold": false
      }
    ]
  },
  {
    "id": 7,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 3.2281,
        "y": 3.1648,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 11.4464,
        "y": 56.7064,
        "w": 38.0257,
        "h": 33.2936,
        "src": "/portfolio/media/image22.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 11.4464,
        "y": 26.3128,
        "w": 37.6016,
        "h": 24.4375,
        "text": "SOCIAL MEDIA MARKETING",
        "font": "Anton",
        "size": 136.76,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 11.4464,
        "y": 13.3442,
        "w": 43.2351,
        "h": 13.3918,
        "text": "Birhan ethiopia clinic",
        "font": "Brittany",
        "size": 106.67,
        "color": "#EE6617",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 57.9037,
        "y": 23.4424,
        "w": 34.4464,
        "h": 6.037,
        "text": "Birhan Ethiopia Clinic is a healthcare provider committed to delivering quality medical services to the community.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 91.3048,
        "y": 91.0833,
        "w": 4.1154,
        "h": 3.5556,
        "text": "06",
        "font": "Glacial Indifference Italic",
        "size": 27.99,
        "color": "#242424",
        "align": "right",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 61.3022,
        "y": 42.6171,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Client: Birhan ethhiiopia clinic",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 61.3022,
        "y": 47.9301,
        "w": 27.1748,
        "h": 9.0926,
        "text": "Objective: Increase the clinic\u2019s visibility and engagement online to reach more patients and build trust.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 61.3022,
        "y": 63.7076,
        "w": 27.1748,
        "h": 9.0926,
        "text": "Our Role: We managed their social media, created informative and engaging content, and promoted their services to the target audience.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 61.3022,
        "y": 73.9296,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Duration: 2 months",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 61.3022,
        "y": 78.707,
        "w": 27.1748,
        "h": 9.0926,
        "text": "Result:  Our campaigns reached over 1.6 million views, significantly increasing patient inquiries and online engagement.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 47.9751,
        "y": -15.2806,
        "w": 88.75,
        "h": 65.2806,
        "src": "/portfolio/media/image12.png",
        "opacity": null
      }
    ]
  },
  {
    "id": 8,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 90.2596,
        "y": 87.9907,
        "w": 4.1154,
        "h": 3.5556,
        "text": "07",
        "font": "Glacial Indifference Italic",
        "size": 27.99,
        "color": "#242424",
        "align": "right",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 6.0629,
        "h": 6.1225,
        "src": "/portfolio/media/image23.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 1.8462,
        "y": 4.3641,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 53.5912,
        "w": 30.9291,
        "h": 75.9101,
        "src": "/portfolio/media/image24.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 0.8114,
        "y": 17.7643,
        "w": 98.3773,
        "h": 28.7703,
        "text": "BRANDING PROJECT",
        "font": "Anton",
        "size": 231.4,
        "color": "#AA212E",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 9.3667,
        "y": 7.963,
        "w": 81.2666,
        "h": 18.4631,
        "text": "DNA Techs",
        "font": "Brittany",
        "size": 147.99,
        "color": "#F5841F",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 20.7422,
        "y": 46.7963,
        "w": 51.7589,
        "h": 2.9815,
        "text": "A complete branding, Partnership and marketing package.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 39.3096,
        "y": 67.9727,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Client: DNA Techs",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 32.4916,
        "y": 80.4153,
        "w": 26.837,
        "h": 15.2037,
        "text": "Our Role: As a partner, DNA Tech supported Ghion Marketing Solutions in data collection and analysis, providing valuable insights that guided marketing strategies and branding decisions for our clients.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 39.9346,
        "y": 73.4542,
        "w": 20.7559,
        "h": 2.9815,
        "text": "Duration: 15 days",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "left",
        "italic": false,
        "bold": false
      }
    ]
  },
  {
    "id": 9,
    "shapes": [
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 100.0,
        "h": 100.0,
        "src": "/portfolio/media/image1.jpeg",
        "opacity": null
      },
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 5.0553,
        "h": 7.3379,
        "src": "/portfolio/media/image25.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 7.7948,
        "y": 17.9622,
        "w": 4.4046,
        "h": 11.9723,
        "src": "/portfolio/media/image7.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 4.7809,
        "y": 36.7753,
        "w": 10.4325,
        "h": 9.2115,
        "src": "/portfolio/media/image11.png",
        "opacity": null
      },
      {
        "type": "image",
        "x": 1.5634,
        "y": 3.1648,
        "w": 12.4628,
        "h": 11.2719,
        "src": "/portfolio/media/image4.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 6.8053,
        "y": 60.939,
        "w": 56.5439,
        "h": 28.8411,
        "text": "CLIENTS SAY",
        "font": "Anton",
        "size": 231.4,
        "color": "#AA202C",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 6.8053,
        "y": 53.6685,
        "w": 46.7093,
        "h": 13.392,
        "text": "What Our",
        "font": "Brittany",
        "size": 106.67,
        "color": "#F5821E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 17.1569,
        "y": 23.0593,
        "w": 46.1922,
        "h": 9.0926,
        "text": "Working with Ghion Marketing Solutions has transformed how we connect with our audience. Their creative content and strategic campaigns significantly boosted our online presence and engagement.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 17.1569,
        "y": 41.0156,
        "w": 46.1922,
        "h": 9.0926,
        "text": "Partnering with Ghion Marketing Solutions allowed us to provide data-driven insights that shaped impactful marketing and branding strategies. Their professionalism and results-driven approach make collaboration seamless.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#545454",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 17.1569,
        "y": 17.4992,
        "w": 20.9664,
        "h": 3.784,
        "text": "majestic ttrading PLC",
        "font": "Anton",
        "size": 30.67,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 17.1569,
        "y": 34.6519,
        "w": 11.1146,
        "h": 3.784,
        "text": "Jalene t.chali",
        "font": "Anton",
        "size": 30.67,
        "color": "#AA212E",
        "align": "left",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": -33.2736,
        "y": 60.0,
        "w": 60.9137,
        "h": 80.0,
        "src": "/portfolio/media/image14.png",
        "opacity": 0.44
      }
    ]
  },
  {
    "id": 10,
    "shapes": [
      {
        "type": "image",
        "x": 92.3501,
        "y": 8.8008,
        "w": 2.0249,
        "h": 2.3984,
        "src": "/portfolio/media/image2.png",
        "opacity": null
      },
      {
        "type": "text",
        "x": 3.8585,
        "y": 51.0448,
        "w": 92.283,
        "h": 35.8395,
        "text": "FOR YOUR TIME",
        "font": "Anton",
        "size": 287.23,
        "color": "#9B303E",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "text",
        "x": 16.7589,
        "y": 51.5993,
        "w": 66.4822,
        "h": 31.6275,
        "text": "Thank You",
        "font": "Brittany",
        "size": 254.25,
        "color": "#F5841F",
        "align": "center",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 0.0,
        "y": 0.0,
        "w": 8.7377,
        "h": 7.6151,
        "src": "/portfolio/media/image26.jpeg",
        "opacity": null
      },
      {
        "type": "text",
        "x": 5.625,
        "y": 10.8289,
        "w": 31.4162,
        "h": 30.4815,
        "text": "This portfolio highlights the projects and collaborations of Ghion Marketing Solutions, showcasing our expertise in social media management, branding, content creation, and digital advertising. Each project reflects our commitment to delivering creative, strategic, and measurable results for our clients.\nWe continue to build meaningful connections between brands and their audiences, helping businesses grow and stand out in a competitive market.",
        "font": "Glacial Indifference",
        "size": 24.0,
        "color": "#D9D9D9",
        "align": "justify",
        "italic": false,
        "bold": false
      },
      {
        "type": "image",
        "x": 63.5778,
        "y": 13.2848,
        "w": 64.2857,
        "h": 80.0,
        "src": "/portfolio/media/image27.png",
        "opacity": 0.32
      }
    ]
  }
];
