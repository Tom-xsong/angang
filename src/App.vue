<template>
  <router-view></router-view>
</template>

<style lang="scss">
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
  }
}
</style>
