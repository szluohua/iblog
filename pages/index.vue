<template>
  <section class="container">
    <div class="content">
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x401);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x402);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x403);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x404);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x405);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <a class="card" href="#!">
        <div class="front" style="background-image: url(//source.unsplash.com/300x406);">
          <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
        </div>
        <div class="back">
          <div>
            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
            <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button class="button">Click Here</button>
          </div>
        </div>
      </a>
      <md-render />
    </div>
  </section>
</template>

<script>
import mdRender from '@/components/mdRender'
export default {
    components: {
        mdRender
    }
}
</script>

<style lang="scss" scoped>
  $primary: hsl(222, 80%, 50%);
  $primary-light: hsl(222, 50%, 95%);
  $secondary: hsl(350, 80%, 50%);
  $red: hsl(10, 80%, 50%);
  $orange: hsl(50, 80%, 50%);
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  @mixin mobile ($size: 640px) {
    @media screen and (max-width: $size) {
      @content;
    }
  }
  html {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    color: #333;
    font-family: "Nunito Sans", sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: $primary-light;
    background-attachment: fixed;
  }
  .content {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1000px;
  }
  .heading {
    width: 100%;
    margin-left: 1rem;
    font-weight: 900;
    font-size: 1.618rem;
    text-transform: uppercase;
    letter-spacing: .1ch;
    line-height: 1;
    padding-bottom: .5em;
    margin-bottom: 1rem;
    position: relative;
    &:after {
      display: block;
      content: '';
      position: absolute;
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
      bottom: 0;
    }
  }
  .description {
    width: 100%;
    margin-top: 0;
    margin-left: 1rem;
    margin-bottom: 3rem;
  }
  .card {
    color: inherit;
    cursor: pointer;
    width: calc(33% - 2rem);
    min-width: calc(33% - 2rem);
    height: 400px;
    min-height: 400px;
    perspective: 1000px;
    margin: 1rem;
    position: relative;
    @include mobile (800px) {
      width: calc(50% - 2rem);
    }
    @include mobile (500px) {
      width: 100%;
    }
  }
  .front,
  .back {
    display: flex;
    border-radius: 6px;
    background-position: center;
    background-size: cover;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: ease-in-out 600ms; // overflow: hidden;
  }
  .front {
    background-size: cover; // background-blend-mode: overlay;
    padding: 2rem;
    font-size: 1.618rem;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    font-family: Poppins, sans-serif;
    &:before {
      position: absolute;
      display: block;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
      opacity: .25;
      z-index: -1;
    }
    .card:hover & {
      transform: rotateY(180deg);
    }
    .card:nth-child(even):hover & {
      transform: rotateY(-180deg);
    }
  }
  .back {
    background: #fff;
    transform: rotateY(-180deg);
    padding: 0 2em;
    .button {
      background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
      &:before {
        box-shadow: 0 0 10px 10px rgba($primary, 0.25);
        background-color: rgba($primary, 0.25);
      }
    }
    .card:hover & {
      transform: rotateY(0deg);
    }
    .card:nth-child(even) & {
      transform: rotateY(180deg);
      .button {
        background: linear-gradient(135deg, adjust-hue($secondary, -20deg), $secondary);
        &:before {
          box-shadow: 0 0 10px 10px rgba($secondary, 0.25);
          background-color: rgba($secondary, 0.25);
        }
      }
    }
    .card:nth-child(even):hover & {
      transform: rotateY(0deg);
    }
  }
  .button {
    $height: 40px;
    transform: translateZ($height);
    cursor: pointer;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-weight: bold;
    color: #fff;
    padding: .5em 1em;
    border-radius: 100px;
    font: inherit;
    border: none;
    position: relative;
    transform-style: preserve-3d;
    transition: 300ms ease;
    &:before {
      transition: 300ms ease;
      position: absolute;
      display: block;
      content: '';
      transform: translateZ(-$height);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      border-radius: 100px;
      left: 10px;
      top: 16px;
    }
    &:hover {
      transform: translateZ($height + 15px);
      &:before {
        transform: translateZ(-($height + 15px));
      }
    }
    &:active {
      transform: translateZ($height/2);
      &:before {
        transform: translateZ(-($height/2));
        top: 12px;
      }
    }
  }
</style>
