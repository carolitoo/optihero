imgToPreload = [
  "img/background/l1_sky.png",
  "img/background/l2_mountains.png",
  "img/background/l4_bg-ground.png",
  "img/background/l5_bg-ground.png",
  "img/background/l6_ground.png",
  "img/game/playclock/bg_clock_transparent.png",
  "img/background/l3_clouds.png",

  "img/statusbar/energy/energy_0.png",
  "img/statusbar/energy/energy_20.png",
  "img/statusbar/energy/energy_40.png",
  "img/statusbar/energy/energy_60.png",
  "img/statusbar/energy/energy_80.png",
  "img/statusbar/energy/energy_100.png",

  "img/statusbar/wind/wind_0.png",
  "img/statusbar/wind/wind_20.png",
  "img/statusbar/wind/wind_40.png",
  "img/statusbar/wind/wind_60.png",
  "img/statusbar/wind/wind_80.png",
  "img/statusbar/wind/wind_100.png",

  "img/collect/coins/coin_ppa_1.png",
  "img/collect/coins/coin_ppa_2.png",
  "img/collect/coins/coin_ppa_3.png",
  "img/collect/coins/coin_ppa_4.png",
  "img/collect/coins/coin_ppa_5.png",
  "img/collect/coins/coin_ppa_6.png",
  "img/collect/coins/coin_ppa_7.png",

  "img/collect/swirl/swirl1.png",
  "img/collect/swirl/swirl2.png",
  "img/collect/swirl/swirl3.png",

  "img/enemies/bullet/bullet.png",
  "img/enemies/shooter/Walk/Walk_00.png",
  "img/enemies/shooter/Walk/Walk_01.png",
  "img/enemies/shooter/Walk/Walk_02.png",
  "img/enemies/shooter/Walk/Walk_03.png",
  "img/enemies/shooter/Walk/Walk_04.png",
  "img/enemies/shooter/Walk/Walk_05.png",
  "img/enemies/shooter/Walk/Walk_06.png",
  "img/enemies/shooter/Walk/Walk_07.png",
  "img/enemies/shooter/Walk/Walk_08.png",
  "img/enemies/shooter/Walk/Walk_09.png",
  "img/enemies/shooter/Walk/Walk_10.png",
  "img/enemies/shooter/Walk/Walk_11.png",
  "img/enemies/shooter/Walk/Walk_12.png",
  "img/enemies/shooter/Walk/Walk_13.png",
  "img/enemies/shooter/Walk/Walk_14.png",
  "img/enemies/shooter/Walk/Walk_15.png",
  "img/enemies/shooter/Walk/Walk_16.png",
  "img/enemies/shooter/Walk/Walk_17.png",
  "img/enemies/shooter/Walk/Walk_18.png",
  "img/enemies/shooter/Walk/Walk_19.png",

  "img/enemies/warrior/Walk/Walk_00.png",
  "img/enemies/warrior/Walk/Walk_01.png",
  "img/enemies/warrior/Walk/Walk_02.png",
  "img/enemies/warrior/Walk/Walk_03.png",
  "img/enemies/warrior/Walk/Walk_04.png",
  "img/enemies/warrior/Walk/Walk_05.png",
  "img/enemies/warrior/Walk/Walk_06.png",
  "img/enemies/warrior/Walk/Walk_07.png",
  "img/enemies/warrior/Walk/Walk_08.png",
  "img/enemies/warrior/Walk/Walk_09.png",
  "img/enemies/warrior/Walk/Walk_10.png",
  "img/enemies/warrior/Walk/Walk_11.png",
  "img/enemies/warrior/Walk/Walk_12.png",
  "img/enemies/warrior/Walk/Walk_13.png",
  "img/enemies/warrior/Walk/Walk_14.png",
  "img/enemies/warrior/Walk/Walk_15.png",
  "img/enemies/warrior/Walk/Walk_16.png",
  "img/enemies/warrior/Walk/Walk_17.png",
  "img/enemies/warrior/Walk/Walk_18.png",
  "img/enemies/warrior/Walk/Walk_19.png",

  "img/enemies/snail/Walk/Walk_00.png",
  "img/enemies/snail/Walk/Walk_01.png",
  "img/enemies/snail/Walk/Walk_02.png",
  "img/enemies/snail/Walk/Walk_03.png",
  "img/enemies/snail/Walk/Walk_04.png",
  "img/enemies/snail/Walk/Walk_05.png",
  "img/enemies/snail/Walk/Walk_06.png",
  "img/enemies/snail/Walk/Walk_07.png",
  "img/enemies/snail/Walk/Walk_08.png",
  "img/enemies/snail/Walk/Walk_09.png",
  "img/enemies/snail/Walk/Walk_10.png",
  "img/enemies/snail/Walk/Walk_11.png",
  "img/enemies/snail/Walk/Walk_12.png",
  "img/enemies/snail/Walk/Walk_13.png",
  "img/enemies/snail/Walk/Walk_14.png",
  "img/enemies/snail/Walk/Walk_15.png",
  "img/enemies/snail/Walk/Walk_16.png",
  "img/enemies/snail/Walk/Walk_17.png",
  "img/enemies/snail/Walk/Walk_18.png",
  "img/enemies/snail/Walk/Walk_19.png",

  "img/collect/swirl/swirl_1.png",
  "img/collect/swirl/swirl_2.png",
  "img/collect/swirl/swirl_3.png",
];


/**
 * This function preloads an image and returns a promise that resolves when the image is loaded.
 * It is used to ensure that images are loaded before they are displayed in the game.
 * 
 * @param {string} url - The URL of the image to preload. 
 * @returns {Promise} - A promise that resolves with the loaded image or rejects if there is an error.
 */
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}


/**
 * This function preloads a list of images in the order they are provided.
 * It uses the preloadImage function to load each image sequentially.
 * 
 * @param {Array} urls - An array of image URLs to preload.
 */
async function preloadImagesInOrder(urls) {
  for (const url of urls) {
    await preloadImage(url);
    console.log(`Bild geladen: ${url}`);
  }
}
