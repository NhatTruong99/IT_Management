<template>
    <div class="app-sidebar">
        <div class="sidebar-icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABuCAYAAAAUCyyjAAAIjUlEQVR4nO1dW8hVRRT+5pxjmpfSpItUamZYEnSxiKLbqw8lUVkPPkT6UNJLdLEgSClKKCICI4KKIIh6KZKi6CG68YMPUXTTHgozy7SLlspv/v4Ts89s/3P+M7P/vfbM2ntmn/3BFvRs16w9a9bMmjVrrREj5yxHAikBITAACcDwzwFjPYB7AJwC4KiBzWkAdgPYCCm38nyG4O2zyTLRf69OmJKBJnAtBD4mvL8YwE6vHJQx+C3CbDE3a2eGB5cRqV7gnYsKZ7FOZS3zfPQh0tsSY15br3g5qkYz+UDV+XFvnARgV9RNmOUiFWAgBmJ10ywn8hohcVnpU6KemlmWkPgMuUIIUzNdOqlm2kZBmMIsTyC1En3d1sxZpLdl4g2iIWDx102YP9FelzTvj8lDFhDCN4Ak6XkbwAs5qI5CYoMEvs9LPnRBKlTjm6XSpBhEXbrnA5g34BTotqve+BUSP0sCYWHrG1Qw9Vp8s3FMs4Js4W731nQEGpkinn3mEG858iIuA4iuocWbikgjU8TnAWo01Io4tyaMGhqjRqaI1zfbaOgA4nYaeNTQmDUyRfynJo2GHkeVmnkWgPkA/jP8Nh3AbwB+z0XJQUMLaORC7ZCw8f0LgD+KceOGaoQp8DiAewHMzHjrHwCbATyZk+aE741PW7cAuBPAjONtDmI/gA0AXmTjwgK6O086L1LXQ4iPCO+vAPCFa6MJ3AS9GsAbhLaUBu8q3FoWn95CLZXA3Z5lpPYklhKd7VxYTusnLEo6vOhTAFVMs6OktwUOs3FCw0Hi+7Tv9AA/wqRpg6zMAq255esuzPhyUWoLN2EGFp1GQhHeAx+09YybzYuazSjDLcxe5NFU39ERngdTFcIMUx98c1XBV1bhm51OfD/LS1QmZhPbmlE2g3yaaZ9mviGO2u88cOMDX5JoSPxo/Y1Ja9vr5p3a04illakaN/1u/z+7IBK/6yV6MB3R6eq9jxoK+wA8CCnfM7fpoUdoJFSQ2Ak6QbedwbdKsV8LgW1G7w+93Xy8O6fB5wk1NGlo9/05kJgPYa07sBfAYbMv2EPNANt3TfVNEnMhMNdSL6GjT3tMJyr+QjMrC7W0H0/9q58CBEuAfRDv1w8NJezJyzGAvPV/ySaiLwGU5Fwpz5p1lkNFOxpXQZToJeudZs/UJ/8uRRum6VP23cZfC0cEZApyuR6ULvUJUoPmB+OvRf3P9m9ta0PK9dCurYtyJJZzR//DKxBitXEPmPUR5t9Up7wJ4A5jB5M7xfofLgXwKoALqRQzyH4O4FZtxPTDX37M1Ul/A0tpDPegn49xCHwA4Ha1NXkawF0e95yKzkUATgfwLpEx8++Dj5oBRgCc54nnFAshsAwCr1u3FXl4tgvyZAh8pfvGF4Tuh3lqelrjkXAv1jB6bxYAOJuJ9pV6P+kG8yBUU+uJTHxf57rWZGF0SpeWm03DxffBTM7cqpgcK8hTHhxqWTe47hhjZJ4z2meckTanbTse1hEYPam2Wj4CO/8xC3PYQ0Ei/XazMIc94IpzMmT8xnCmWWoHcgqeq94CM5qwEVcENCWHI8yQ1qlQDDEiGs00oVYGUBUIYc2M3IrnEWaRTgmhEyPfjvEIM+2USNeeWME7zeYVEH+SLBM004HwHkZNgyKaHCIq5r8puF8jhL01yRrpzRo7gGqEGevtBoGv65zT7DHH4LAsjDGfZw4efPtpjfNwOhEml0BnJQnvfMfIXHx3vA3CwWh8UxS8N7QYY1JUGP/lA8FQfnAVozBVyOkSrxQnKqFc4ZVuP2a2mLOsnmLSysdYqHahNPMZrxTTiEKBTV7p9uOvlg6z5CoPtgICWz1G0p0LJPdj+r8qsR+rADwP4CRP9FSM7Kda6zmgpu+H0iwwldd3czI1FpvXx/W0t0hXspocF6pq+byfFLpXI99kFdozpKQ2HFTFq5U6ar4X6vqLt3TNuv5JfWrrc1wHgau409uSuNZ+7NF874NMNFb005vkAZKTWpdyDEKoKftGA99qRnxH1wdsFVyMOjogT6U97phI6fOHOQCe0xHt3FDt3A+Jo9b0vPxddJq+RuMmdq4lNkFgo2+yHMJM8QmAa7iIJ6NaylVJTmlWriU1BETgW3JpNRpegsQ6jv0q5z7zYUba6FaO9NwjXXLeNaYHKg/nAS7HA6cwt+u1kgN7E/o+08rVnrD7bGOMlt8B4G8m2qzuvA7jJnnUQxpfP/pLABxjGuhHMsoCOINTM9uM9Nv64UCH0QNr5tnTXtxPIUQbmpONQQQdBN0ILBg0h9M1QjHNDCFLKvYQEwbQhRlKJzbT+wBo0+ywaQPlewPom/zCHMZpjaL9AcwU+afZZloLHo01WyMMRxZYSIm8jBgOYQ7JEtHkZ5YNH4akZXA2wiwbQ1GggopIa/VwIl5hNlulAXQYnQEdCPK1F3kxnVGcPGHbE7TZ0GEkf4A5H4Qrj6XFePDtKw7XiBbtllHScwBSbmHi+1nGOB0Vf7uTifZnUqpwWp6Hc5pVuE93+i06nta1ZLi6teC13PdQF4MKQrsBwMsALtbxQC4DJ42FUoWU7y5wYXluiJHFjJH+4vgfHZ2g5JLS1tG1YLk00oQFSXsyKZ2dDSlt96209SBmvyG+LGt2rNgdJpVjsFZ7wGgc7TVCI8waoa7uvDN0RtvkkuVCG1J7Cl0BFTjqKMzNANZr63myrZ6aJyq94VGd9VUblGXNloWVOlcxHySWWW8ZMtyClwm7NVsa4lszs/0WtJEpsMRy/0iUqJsBdJD4Pmv1j7IR35rpV2tqFXPYbE3yIJJptxFmjdAIs0YId80supoNcQRCuMIsQyiyYCuBDpjwhOlmX84mdnSxezJ9XdHvGWGtme4bha+J7+9wai2wjU1Ymuk+0j8E8AiAtfpWXZNTQDna/wTwBET34u1aAMD/JVcnPtoXVFgAAAAASUVORK5CYII=" class="sidebar-logo">
            <span>IT Management</span>
        </div>

        <div class="sidebar-menu">
            <router-link to="/" :class="{ active: isActive('/') }">
                <i class="fas fa-laptop"></i>
                <span>Tất cả thiết bị</span>
            </router-link>

            <router-link to="/hardwares" :class="{ active: isActive('/hardwares') }">
                <i class="fas fa-link"></i>
                <span>Tất cả linh kiện</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppHeader",
        methods: {
            isActive(route) {
                return this.$route.path === route;
            }
        }
    };
</script>

<style scoped>
    .app-sidebar {
        position:fixed;
        width: 250px !important;
        top: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
    }

    .sidebar-icon {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
    }

    .sidebar-icon img {
        width: 35px;
        object-fit: cover;
        margin-right: 10px;
    }

    .sidebar-menu {
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .sidebar-menu a {
        text-decoration: none;
        color: gray;
        margin-bottom: 20px;
    }

    .sidebar-menu a:hover {
        color: #1D37B5;
    }

    .sidebar-menu a span {
        margin-left: 10px;
    }

    .sidebar-menu a.active {
        font-weight: bold;
        color: #1D37B5;
    }
</style>