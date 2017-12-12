export class Config {

  /* App Resources */
  // public static readonly API_URI = 'http://130.245.169.199:8080/api/';
  public static readonly API_URI = 'http://localhost:8080/api/';
  public static readonly ASSETS_PATH = '../../assets/';
  public static readonly AUDIO_PATH = Config.ASSETS_PATH + 'audio/';
  public static readonly IMAGES_PATH = Config.ASSETS_PATH + 'images/';
  public static readonly AUDIO_IMAGES = Config.ASSETS_PATH + Config.IMAGES_PATH + 'audio/';
  public static readonly ALBUM_IMAGES = Config.IMAGES_PATH + 'album-art/';
  public static readonly AD_IMAGES = Config.IMAGES_PATH + 'ads/';
  public static readonly LOGO_IMAGE = Config.ASSETS_PATH + Config.IMAGES_PATH + 'AmplioLogo.png';
  public static readonly LOGO_SMALL_IMAGE = Config.ASSETS_PATH + Config.IMAGES_PATH + 'AmplioLogoSmall.png';
  public static readonly CREDIT_CARDS_IMAGE = Config.IMAGES_PATH + 'creditcards.png';
  public static readonly ALBUM_DEFAULT_IMAGE = Config.ALBUM_IMAGES + 'default.png';
  public static readonly PROFILE_DEFAULT_IMAGE = Config.IMAGES_PATH + 'user.png';

  /* Audio Nav Bar Configuration */
  public static readonly PLAY_IMAGE = Config.AUDIO_IMAGES + 'play.svg';
  public static readonly PAUSE_IMAGE = Config.AUDIO_IMAGES + 'pause.svg';
  public static readonly SHUFFLE_OFF_IMAGE = Config.AUDIO_IMAGES + 'shuffle.svg';
  public static readonly SHUFFLE_ON_IMAGE = Config.AUDIO_IMAGES + 'shuffle-on.svg';
  public static readonly PREVIOUS_IMAGE = Config.AUDIO_IMAGES + 'previous.svg';
  public static readonly NEXT_IMAGE = Config.AUDIO_IMAGES + 'next.svg';
  public static readonly QUEUE_IMAGE = Config.AUDIO_IMAGES + 'queue.svg';
  public static readonly VOLUME_IMAGE = Config.AUDIO_IMAGES + 'volume.svg';
  public static readonly MUTE_IMAGE = Config.AUDIO_IMAGES + 'mute-on.svg';
  public static readonly REPEAT_OFF_IMAGE = Config.AUDIO_IMAGES + 'repeat.svg';
  public static readonly REPEAT_ALL_IMAGE = Config.AUDIO_IMAGES + 'repeat-on.svg';
  // TODO Repeat one
  public static readonly REPEAT_ONE_IMAGE = Config.AUDIO_IMAGES + 'repeat-on.svg';
  public static readonly PLAYER_GRANULARITY = 1000000;
  public static readonly LYRICS_OFF_IMAGE = Config.AUDIO_IMAGES + 'lyrics.svg';
  public static readonly LYRICS_ON_IMAGE = Config.AUDIO_IMAGES + 'lyrics-on.svg';

}
