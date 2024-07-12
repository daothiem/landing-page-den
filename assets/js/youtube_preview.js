function api_youtube(id_element,id_youtube,full_height=false) {
    let section_width = document.querySelector('section').offsetWidth;
    if(!full_height){
      document.querySelector('#'+id_element).style.height = screen.height+'px';
      let width = section_width+(parseFloat(screen.height)-(315*(section_width/560)));
      document.querySelector('#'+id_element).style.width = width+'px';
      document.querySelector('#'+id_element).parentNode.style.left = ((width-screen.width)/2)+'px';
      document.querySelector('#'+id_element).parentNode.style.width = 'max-content';
    }else{
      document.querySelector('#'+id_element).style.width = section_width+'px';
      document.querySelector('#'+id_element).style.height = (315*(section_width/560))+'px';
    }
    var player;
    try{
        player = new YT.Player(id_element, {
          videoId: id_youtube, // YouTube Video ID
          playerVars: {
              autoplay: 1, // Auto-play the video on load
          autohide: 1, // Hide video controls when playing
          disablekb: 1,
          controls: 0, // Hide pause/play buttons in player
          showinfo: 0, // Hide the video title
          modestbranding: 1, // Hide the Youtube Logo
          loop: 1, // Run the video in a loop
          fs: 0, // Hide the full screen button
          rel: 0,
          enablejsapi: 1,
          },
          events: {
              onReady: function(e) {
                  e.target.setVolume(10);
                  e.target.mute();
                  e.target.playVideo();
                  e.target.setPlaybackQuality('hd720');
              },
              onStateChange: function (e) {
              if (e.data === YT.PlayerState.ENDED) {
                player.seekTo(0);
              }
          }
          }
      });
      }catch(e){
        console.log(e)
      }
}
