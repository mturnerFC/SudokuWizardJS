// From https://spin.js.org/spin.js

class Spinner{
	constructor () {
        const colors = new UIColors();
		const options = {
			lines: 12,
		    length: 7,
		    width: 5,
		    radius: 10,
		    scale: 1.0,
		    corners: 1,
		    color: colors.ActivityIndicatorColor,
		    fadeColor: 'transparent',
		    animation: 'spinner-line-fade-default',
		    rotate: 0,
		    direction: 1,
		    speed: 1,
		    zIndex: 2e9,
		    className: 'spinner',
//		    top: '50%',
//		    left: '50%',
		    top: '110%',
		    left: '15%',
		    shadow: '0 0 1px transparent',
		    position: 'absolute'
		};
	    this.Spin = (target) => {
		    const saveButton = $("#saveButton")[0];
	        this.el = document.createElement('div');
			this.el.className = options.className;
	        this.el.setAttribute('role', 'progressbar');
	        Css(this.el, {
	            position: options.position,
	            width: 0,
	            zIndex: options.zIndex,
	            left: options.left,
	            top: options.top,
	            transform: "scale(" + options.scale + ")",
	        });
	        if (target) {
	            target.insertBefore(this.el, target.firstChild || null);
	        }
	        DrawLines(this.el, options);
	        return this;
	    };

	    this.Stop = () => {
			if (this.el) {
	            if (typeof requestAnimationFrame !== 'undefined') {
	                cancelAnimationFrame(this.animateId);
	            }
	            else {
	                clearTimeout(this.animateId);
	            }
	            if (this.el.parentNode) {
	                this.el.parentNode.removeChild(this.el);
	            }
	            this.el = undefined;
	        }
	        return this;
	    };
		const Css = (el, props) => {
		    for (var prop in props) {
		        el.style[prop] = props[prop];
		    }
		    return el;
		};
	
		const GetColor = (color, idx) => {
		    return typeof color == 'string' ? color : color[idx % color.length];
		};
		
		const DrawLines = (el, options) => {
			const borderRadius = (Math.round(options.corners * options.width * 500) / 1000) + 'px';
			let shadow = 'none';
			if (options.shadow === true) {
		        shadow = '0 2px 4px #000'; // default shadow
		    } else if (typeof options.shadow === 'string') {
	            shadow = options.shadow;
	    	}
	        const shadows = ParseBoxShadow(shadow);
	        for (let i = 0; i < options.lines; i++) {
		        const degrees = ~~(360 / options.lines * i + options.rotate);
	            const  backgroundLine = Css(document.createElement('div'), {
		            position: 'absolute',
		            top: -options.width / 2 + "px",
		            width: (options.length + options.width) + 'px',
		            height: options.width + 'px',
		            background: GetColor(options.fadeColor, i),
		            borderRadius: borderRadius,
		            transformOrigin: 'left',
		            transform: "rotate(" + degrees + "deg) translateX(" + options.radius + "px)",
	       		 });
	             let delay = i * options.direction / options.lines / options.speed;
	             delay -= 1 / options.speed; // so initial animation state will include trail
	             const line = Css(document.createElement('div'), {
		            width: '100%',
		            height: '100%',
		            background: GetColor(options.color, i),
		            borderRadius: borderRadius,
		            boxShadow: NormalizeShadow(shadows, degrees),
		            animation: 1 / options.speed + "s linear " + delay + "s infinite " + options.animation,
		        });
	            backgroundLine.appendChild(line);
	        	el.appendChild(backgroundLine);
			}
		};
		const ParseBoxShadow = (boxShadow) => {
			const regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
			let shadows = [];
			for (let i = 0, a = boxShadow.split(','); i < a.length; i++) {
				const shadow = a[i];
				const matches = shadow.match(regex);
				if (matches === null) {
					continue; // invalid syntax
				}
				const x = +matches[2];
				const y = +matches[5];
				let xUnits = matches[4];
	            let yUnits = matches[7];
	            if (x === 0 && !xUnits) {
		            xUnits = yUnits;
		        }
		        if (y === 0 && !yUnits) {
		            yUnits = xUnits;
		        }
	            if (xUnits !== yUnits) {
		            continue; // units must match to use as coordinates
		        }
				shadows.push({
		            prefix: matches[1] || '',
		            x: x,
		            y: y,
		            xUnits: xUnits,
		            yUnits: yUnits,
		            end: matches[8],
		        });
			}
			return shadows;
	    };
	    const NormalizeShadow = (shadows, degrees) => {
		    let normalized = [];
	        for (let i = 0, shadows_1 = shadows; i < shadows_1.length; i++) {
		        const shadow = shadows_1[i];
		        const xy = ConvertOffset(shadow.x, shadow.y, degrees);
		        normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
		    }
			return normalized.join(', ');
		};
		const ConvertOffset = (x, y, degrees) => {
			const radians = degrees * Math.PI / 180;
			const sin =Math.sin(radians);
			const cos = Math.cos(radians);
			return [
				Math.round((x * cos + y * sin) * 1000) / 1000,
	            Math.round((-x * sin + y * cos) * 1000) / 1000,
			];
	    }
	}
}