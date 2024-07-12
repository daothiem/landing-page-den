a(".animate-rotate-2,.animate-rotate-3,.animate-type,.animate-scale").forEach((item)=>{
    let html = `<animate class="visible">${item.textContent}</animate>`;
    let array_text = item.getAttribute('text');
    let max = item.textContent.length;
    if(array_text){
      for(let i of array_text.split(',')){
        html+= `<animate>${b64_to_utf8(i)}</animate>`;
        if(i.length > max){
          max = i.length;
        }
      }
    }
    item.innerHTML = html;
    a("animate",item).forEach((item,index)=>{
      let html_item = ``;
      for(let i of item.textContent.split('')){
        html_item += `<item class="${index?'out':'in'} ${i.trim()!=''?'':'space'}">${i}</item>`;
      }
      item.innerHTML = html_item;
    })
    let index = 0;
    if(item.classList.contains('animate-type')){
      let color_pulse = window.getComputedStyle(item).getPropertyValue('color');
      document.documentElement.style.setProperty("--after-pulse", color_pulse);
      setTimeout(function() {
        // q(`animate:nth-child(1)`,item).style.background = '#bfe3fff5';
      },1000)
    }
    setTimeout(function() {
      loop_animate(index,item,max);
    },2000)
  })

  async function loop_animate(index,item,max) {

    let span = q(`animate:nth-child(${ index })`,item);
    if(!span){
      index = 1;
      span = q(`animate:nth-child(1)`,item);
    }
    if(item.classList.contains('animate-type')){
      span.style.background = null;
    }
    let span_next = q(`animate:nth-child(${index + 1})`,item);
    if(!span_next){
      span_next = q(`animate:nth-child(1)`,item);
    }
    run_animate_in(span,item,max)
    await run_animate_out(span_next,item,max)
    index++;

    if(item.classList.contains('animate-type')){
      setTimeout(function() {
        span_next.style.background = '#bfe3fff5';
      },1000)
    }
    setTimeout(function() {
      
      loop_animate(index,item,max);
    },2000)
  }
  
  function run_animate_in(span,group,time) {
      return new Promise((resolve)=>{
        // span.classList.toggle('show');
        q("item",span).classList.add('out');
        q("item",span).classList.remove('in');
        span.classList.remove('visible');
        var animate_in = setInterval(function() {
          let check_class = q("item",span).className;
          if(check_class == 'out' && q(".in",span)){
            q(".in",span).classList.add('out')
            q(".in",span).classList.remove('in')
          }else if(check_class == 'in' &&  !q(".out",span)){
            clearInterval(animate_in);
          }
          else if(check_class == 'in' &&  q(".out",span)){
            q(".out",span).classList.add('in')
            q(".out",span).classList.remove('out')
          }else if(check_class == 'out' &&  !q(".in",span)){
            clearInterval(animate_in);
          }
        },100)
      })
  }
  function run_animate_out(span,group,time) {
      return new Promise((resolve)=>{
        q("item",span).classList.remove('out');
        q("item",span).classList.add('in');
        span.classList.add('visible');
        let animate_out = setInterval(function() {
          let check_class = q("item",span).className;
          if(check_class == 'out' && q(".in",span)){
            q(".in",span).classList.add('out')
            q(".in",span).classList.remove('in')
          }else if(check_class == 'in' &&  !q(".out",span)){
            clearInterval(animate_out);
            resolve(true);
          }else if(check_class == 'out' &&  !q(".in",span)){
            clearInterval(animate_out);
            resolve(true);
          }else if(check_class == 'in' &&  q(".out",span)){
            q(".out",span).classList.add('in')
            q(".out",span).classList.remove('out')
          }
        },100)
      })
  }
  // Rotate-1

a(".animate-rotate-1,.animate-loading-bar,.animate-slide,.animate-zoom,.animate-push").forEach((item)=>{
    let index = 1
    let html = `<animate class="is-visible">${item.textContent}</animate>`;
    let array_text = item.getAttribute('text');
    let max = item.textContent.length;
    if(array_text){
      for(let i of array_text.split(',')){
        html+= `<animate >${b64_to_utf8(i)}</animate>`;
        if(i.length > max){
          max = i.length;
        }
      }
    }
    item.innerHTML = html;
    if(item.classList.contains('animate-loading-bar')){
      let color_loading = window.getComputedStyle(item).getPropertyValue('color');
      document.documentElement.style.setProperty("--bg-loading-bar", color_loading);
    }
    setInterval(function() {
      if(item.classList.contains('animate-loading-bar')){
        item.classList.remove('loading');
        setTimeout(function() {
          item.classList.add('loading');
        },500)
      }
      let child = q(`animate:nth-child(${ index })`,item);
      if(!child){
        index = 1;
        child = q(`animate:nth-child(${ 1 })`,item);
      }
      child.className = 'is-hidden';
      let next = q(`animate:nth-child(${ index+1 })`,item);
      if(!next){
        next = q(`animate:nth-child(${ 1 })`,item);
      }
      item.style.width = (next.offsetWidth+1)+'px';
      
      next.className = 'is-visible';
      index++;
      
    },2400)
})
a(".animate-clip").forEach((item)=>{
    let index = 1
    let html = `<animate class="is-visible">${item.textContent}</animate>`;
    let array_text = item.getAttribute('text');
    let max = item.textContent.length;
    if(array_text){
      for(let i of array_text.split(',')){
        html+= `<animate >${b64_to_utf8(i)}</animate>`;
        if(i.length > max){
          max = i.length;
        }
      }
    }
    item.innerHTML = html;
    let color_loading = window.getComputedStyle(item).getPropertyValue('color');
    document.documentElement.style.setProperty("--bg-cusor-clip", color_loading);
    item.setAttribute('style',`width:${(q(`animate:nth-child(1)`,item).offsetWidth+5)}px;transition:width .3s`);
    setInterval(function() {
      item.classList.remove('loading');
      setTimeout(function() {
        item.classList.add('loading');
        item.setAttribute('style',`width:2px;transition:width .3s`);
        let child = q(`animate:nth-child(${ index })`,item);
        if(!child){
          index = 1;
          child = q(`animate:nth-child(${ 1 })`,item);
        }
        
        let next = q(`animate:nth-child(${ index+1 })`,item);
        if(!next){
          next = q(`animate:nth-child(${ 1 })`,item);
        }
        setTimeout(function() {
          child.className = 'is-hidden';
          item.setAttribute('style',`width:${(next.offsetWidth+5)}px;transition:width .3s`);
          item.classList.remove('loading');
          next.className = 'is-visible';
        },1000)
        index++;
      },200)
      
    },3000)
})