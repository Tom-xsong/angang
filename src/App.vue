<template>
  <router-view></router-view>
</template>

<style lang="scss">
article,
aside,
blockquote,
body,
button,
code,
dd,
details,
div,
dl,
dt,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
hr,
input,
legend,
li,
menu,
nav,
ol,
p,
pre,
section,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}
ol,
ul,
li {
  list-style: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  width: 100%;
  background: #eeeff2;
}

.self-menu {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 4px 0;
  .menu-item {
    display: flex;
    align-items: center;
    padding: 0 14px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    // .demonstration {
    //   padding-right: 6px;
    // }
  }
}
</style>
