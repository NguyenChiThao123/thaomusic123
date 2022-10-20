  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const cdWdith = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const btnprev = $('.btn-prev')
const btnnext = $('.btn-next')
const btnRandom = $('.btn-random')
const btnrepeat = $('.btn-repeat')
const playlist = $('.playlist')

  const app = {
    currentIndex :0,
    isPlaying : false,
    isRandom: false,
    isRepeat : false,
    songs: [
      {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "./Doan-Tuyet-Nang-Di-Lofi-Version-Phat-Huy-T4.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./Doan-Tuyet-Nang-Di-Lofi-Version-Phat-Huy-T4.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
          "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
      {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
        image:
          "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
      },
      {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
        image:
          "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
          "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
      },
      {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      }
    ],

   render : function(){
     const htmls = this.songs.map(function(song,index){
      return`
      <div class="song>
          <div class="thumb"
              style="background-image: url('${song.image}')">
          </div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>
  `
     })
     $('.playlist').innerHTML = htmls.join('')
   },
   
    handleEvents : function(){
      _this = this;

      //
      const cdThumbAnimate = cdThumb.animate([
        { 
          transform : 'rotate(360deg)'}
      ],{
        duration : 15000,
        itertions : Infinity
      })

      //
      document.onscroll = function(){
        const srcollTop = window.scrollY || document.documentElement.scrollTop
        const newWidthSrcoll = cdWdith - srcollTop
        cd.style.width = newWidthSrcoll > 0 ? newWidthSrcoll + 'px' : 0
        cd.style.opacity = newWidthSrcoll / cdWdith
      }

      //
      playBtn.onclick = function(){
        if(_this.isPlaying){
          _this.isPlaying = false;
          audio.pause();
          player.classList.remove('playing')
          cdThumbAnimate.pause()
        }else{
          _this.isPlaying = true
          audio.play();
          player.classList.add('playing')
          cdThumbAnimate.play()
        }
      }

      //
      audio.ontimeupdate = function(){
         if(audio.duration){
          const setTime = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = setTime
         }
      }
      progress.onchange = function(e){
        const progressPefet = (audio.duration / 100 * e.target.value)
        audio.currentTime = progressPefet
      }
      
      //
      btnnext.onclick = function(){
        if(_this.isRandom){
          _this.ramdomSong()
        }else{
            _this.nextSong()
        }

        audio.play()
        _this.render()
      }
      btnprev.onclick = function(){
        if(_this.isRandom){
          _this.ramdomSong()
        }else{
           _this.preSong()
        }
        audio.play()
      }
      btnRandom.onclick = function(){
        _this.isRandom = !_this.isRandom
        btnRandom.classList.toggle('active',_this.isRandom)
      }
      
       btnrepeat.onclick = function(){
        _this.isRepeat  = !_this.isRepeat
        btnrepeat.classList.toggle('active',_this.isRepeat)
       }
      audio.onended = function(){
       if(_this.isRepeat){
        audio.play()
       }else{
        btnnext.click()
       }
      }

      playlist.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");
  
        if (songNode || e.target.closest(".option")) {
          // Xử lý khi click vào song
          // Handle when clicking on the song
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }
  
          // Xử lý khi click vào song option
          // Handle when clicking on the song option
          if (e.target.closest(".option")) {
          }
        }
      };
    },

  defineProperties : function(){
   Object.defineProperty(this,'currentSong',{
    get : function(){
      return this.songs[this.currentIndex]
    }
   })
  },

  loadcurrentSong : function(){
     heading.textContent = this.currentSong.name
     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
     audio.src = this.currentSong.path
  },

   nextSong: function(){
      this.currentIndex++
      if(this.currentIndex >= this.songs.length){
         this.currentIndex =0
      }
      this.loadcurrentSong()
   },
   preSong: function(){
     this.currentIndex--
     if(this.currentIndex < 0){
      this.currentIndex = this.songs.length -1
     }
     this.loadcurrentSong()
   },
   ramdomSong: function(){
    let newIndex
    do {
         newIndex = Math.floor(Math.random()*this.song.length)
    }while(newIndex === this.currentIndex)
      this.currentIndex = newIndex
      this.loadcurrentSong()
   },
   start : function(){

   
    this.defineProperties(); 
    this.loadcurrentSong(); 
    this.handleEvents();
     this.render()
   },
  }
  app.start()