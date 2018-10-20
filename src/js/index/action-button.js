{
  let view = {
    el: '.action-button',
    template: `
    <div class="button-icon-1">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-stop"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
        </svg>
    </div>
    <div class="button-icon-2">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-list"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lyric"></use>
        </svg>
    </div>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()
    }
  }
  controller.init(view, model)
}
