if(q(".event_scoll_action") && document.body.offsetWidth >  700){
  a("[id^=SECTION] .event_scoll_action").forEach((item)=>{
    item.setAttribute('data_topoffset',getOffsetTop(item));
  })
  window.addEventListener('scroll',function(event) {
    let scroll = this.scrollY;
    a("[data_topoffset]").forEach((item)=>{
      if(parseFloat(item.getAttribute("data_topoffset")) < this.scrollY + window.innerHeight
        && parseFloat(item.getAttribute("data_topoffset")) > this.scrollY){
        item.dispatchEvent(new Event('scroll_action'))
      }
    })
  })
  window.dispatchEvent(new Event('scroll'))
}


