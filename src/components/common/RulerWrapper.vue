<template>
    <div 
        class="ruler-wrapper" 
        @mouseleave="resetRuleLinePos()" 
    >
        <div
            class="ruler-container horizontal-container"
            @mousemove="addTempRuleLine('vertical', $event)"
        ></div>
        <div
            class="ruler-container vertical-container"
            @mousemove="addTempRuleLine('horizontal', $event)"
        ></div>
        <div class="corner">
            <a @click="hideRulerlines()">
                <i class="fa fa-eye-slash" v-show="!ruleLines.hideFlag" title="隐藏参考线"></i>
                <i class="fa fa-eye" v-show="ruleLines.hideFlag" title="显示参考线"></i>
            </a>
        </div>
        <div class="ruler-line-container">
            <!-- 临时水平辅助线 -->
            <div
                v-show="showRuleTopLine"
                class="ruler-line temp horizontal"
                :style="{'top': (horizontalScale && Math.round(horizontalScale(ruleLineTop)) + 50 || 0) + 'px'}"
                @click="addRuleLine('horizontal')"
                @mouseleave="resetRuleLinePos()"
            >
                <span>{{ruleLineTop}}</span>
            </div>
            <!-- 水平辅助线 -->
            <div
                v-show="!ruleLines.hideFlag"
                v-for="line,index in ruleLines.horizontal"
                class="ruler-line horizontal"
                :style="{
                    'top': (horizontalScale && Math.round(horizontalScale(line)) + 50 || 0) + 'px',
                    'border-top-color': moveLine.type==='horizontal'&&moveLine.index===index ? '#008ff8' : ''
                }"
                @dblclick="removeRuleLine('horizontal', index)"
                @mousedown="changeLinePox('horizontal', index, $event)"
            >
                <span :style="{'color': moveLine.type==='horizontal'&&moveLine.index===index ? '#008ff8' : ''}">{{line}}</span>
            </div>
            <!-- 临时垂直辅助线 -->
            <div
                v-show="showRuleLeftLine"
                class="ruler-line temp vertical"
                :style="{'left': (verticalScale && Math.round(verticalScale(ruleLineLeft)) + 50 || 0) + 'px'}"
                @click="addRuleLine('vertical')"
                @mouseleave="resetRuleLinePos()"
            >
                <span>{{ruleLineLeft}}</span>
            </div>
            <!-- 垂直辅助线 -->
            <div
                v-show="!ruleLines.hideFlag"
                v-for="line,index in ruleLines.vertical"
                class="ruler-line vertical"
                :style="{
                    'left':(verticalScale && Math.round(verticalScale(line)) + 50 || 0) + 'px',
                    'border-left-color': moveLine.type==='vertical'&&moveLine.index===index ? '#008ff8' : ''
                }"
                @dblclick="removeRuleLine('vertical', index)"
                @mousedown="changeLinePox('vertical', index, $event)"
            >
                <span :style="{'color': moveLine.type==='vertical'&&moveLine.index===index ? '#008ff8' : ''}">{{line}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: "RulerWrapper",
    props: ['curPinConfig', 'saveRulerLines'],
    data() {
        return {
            ruleLineTop: 0,
            ruleLineLeft: 0,
            showRuleTopLine: false,
            showRuleLeftLine: false,
            ruleLines: {
                horizontal: [],
                vertical: [],
                hideFlag: false
            },
            preHeight: null,
            horizontalScale: null,
            verticalScale: null,
            horizontalScaleReverse: null,
            verticalScaleReverse: null,
            moveLine: {}
        };
    },
    methods: {
        addTempRuleLine(type, $event) {
            let _self = this;
            if (type === "horizontal") {
                if (!_self.horizontalScaleReverse) return;
                let temp = _self.horizontalScaleReverse($event.offsetY - 50);
                if (temp % 5 === 0) {
                    // prefect
                } else if (temp % 5 < 1) {
                    temp = Math.ceil(temp) - 1;
                } else if (temp % 5 > 4) {
                    temp = Math.floor(temp) + 1;
                } else {
                    temp = Math.round(temp);
                }
                _self.ruleLineTop = temp;
                _self.showRuleTopLine = true;
            } else if (type === "vertical") {
                if (!_self.verticalScaleReverse) return;
                let temp = _self.verticalScaleReverse($event.offsetX - 50);
                if (temp % 5 === 0) {
                    // prefect
                } else if (temp % 5 < 1) {
                    temp = Math.ceil(temp) - 1;
                } else if (temp % 5 > 4) {
                    temp = Math.floor(temp) + 1;
                } else {
                    temp = Math.round(temp);
                }
                _self.ruleLineLeft = temp;
                _self.showRuleLeftLine = true;
            }
        },
        addRuleLine(type) {
            let _self = this;
            if (_self.ruleLines.hideFlag) return;
            if (type === "horizontal" && _self.ruleLines.horizontal.indexOf(_self.ruleLineTop) === -1) {
                _self.ruleLines.horizontal.push(_self.ruleLineTop);
                _self.ruleLineTop = 0;
                _self.showRuleTopLine = false;
            } else if (type === "vertical" && _self.ruleLines.vertical.indexOf(_self.ruleLineLeft) === -1) {
                _self.ruleLines.vertical.push(_self.ruleLineLeft);
                _self.ruleLineLeft = 0;
                _self.showRuleLeftLine = false;
            }

            _self.saveRulerLines(_self.ruleLines);
        },
        removeRuleLine(type, index) {
            let _self = this;
            if (type === "horizontal") {
                _self.ruleLines.horizontal.splice(index, 1);
            } else if (type === "vertical") {
                _self.ruleLines.vertical.splice(index, 1);
            }

            _self.saveRulerLines(_self.ruleLines);
        },
        hideRulerlines() {
            let _self = this;
            _self.$set(_self.ruleLines, "hideFlag", !_self.ruleLines.hideFlag);

            _self.saveRulerLines(_self.ruleLines);
        },
        resetRuleLinePos() {
            let _self = this;
            _self.ruleLineLeft = 0;
            _self.ruleLineTop = 0;
            _self.showRuleTopLine = false;
            _self.showRuleLeftLine = false;
        },
        drawTicks(pinboardScrollHeight=0, pinboardScale=1) {
            // let clientRect = _el.getBoundingClientRect();
            let _self = this;
            let _el = _self.$el;
            let width = _el.offsetWidth;
            let height = Math.max(_self.preHeight, pinboardScrollHeight + 100);
            let ticksWidth = width - 50;
            let ticksHeight = height - 50;
            let factWidth = ticksWidth / pinboardScale;
            let factHeight = ticksHeight / pinboardScale;
            let scale = Math.round(1 / pinboardScale);
            let horizontalScale = d3.scale.linear().domain([0, factWidth]).range([0, ticksWidth]);
            let verticalScale = d3.scale.linear().domain([0, factHeight]).range([0, ticksHeight]);

            if (_self.curPinConfig&&_self.curPinConfig.ruleLines) _self.ruleLines = _self.curPinConfig.ruleLines;

            _self.horizontalScale = horizontalScale;
            _self.verticalScale = verticalScale;
            _self.horizontalScaleReverse = d3.scale.linear().domain([0, ticksWidth]).range([0, factWidth]);
            _self.verticalScaleReverse = d3.scale.linear().domain([0, ticksHeight]).range([0, factHeight]);

            // 重置刻度区域高度
            _el.style.height = height + "px";
            // 清空旧的刻度
            d3.selectAll(".ruler-container svg").each(function() {
                this.remove();
            });

            // 水平方向的刻度，服务于垂直的辅助线
            let horizontalContainer = d3
                .select(".horizontal-container")
                .append("svg")
                .style("display", "block")
                .style("width", "100%")
                .style("height", "100%");

            let horizontalLine = horizontalContainer
                .append("g")
                .attr("transform", "translate(50, 0)");

            horizontalLine
                .selectAll("line")
                .data(new Array(Math.ceil(factWidth / scale)))
                .enter()
                .append("line")
                .attr("x1", function(d, i) {
                    return horizontalScale(i * scale * 10) + "px";
                })
                .attr("x2", function(d, i) {
                    return horizontalScale(i * scale * 10) + "px";
                })
                .attr("y1", function(d, i) {
                    return "30px";
                })
                .attr("y2", function(d, i) {
                    return 30 - (i % 10 === 0 ? 25 : 10) + "px";
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", "1px");

            let horizontalText = horizontalContainer
                .append("g")
                .attr("transform", "translate(50, 0)");

            horizontalText
                .selectAll("line")
                .data(new Array(Math.ceil(factWidth / scale / 10)))
                .enter()
                .append("text")
                .text(function(d, i) {
                    return i * scale * 100;
                })
                .attr("dy", "1em")
                .style("font-size", "12px")
                .style("fill", "#fff")
                .attr("stroke", "null")
                .attr("font-weight", "100")
                .attr("transform", function(d, i) {
                    return "translate(" + (horizontalScale(i * scale * 100) + 5) + ", 0)";
                });
            // 水平方向的刻度 end

            // 垂直方向的刻度，服务于水平的辅助线
            let verticalContainer = d3
                .select(".vertical-container")
                .append("svg")
                .style("display", "block")
                .style("width", "100%")
                .style("height", "100%");

            let verticalLine = verticalContainer
                .append("g")
                .attr("transform", "translate(0, 50)");

            verticalLine
                .selectAll("line")
                .data(new Array(Math.ceil(factHeight / scale)))
                .enter()
                .append("line")
                .attr("x1", function(d, i) {
                    return "30px";
                })
                .attr("x2", function(d, i) {
                    return 30 - (i % 10 === 0 ? 25 : 10) + "px";
                })
                .attr("y1", function(d, i) {
                    return verticalScale(i * scale * 10) + "px";
                })
                .attr("y2", function(d, i) {
                    return verticalScale(i * scale * 10) + "px";
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", "1px");

            let verticalText = verticalContainer
                .append("g")
                .attr("transform", "translate(0, 50)");

            verticalText
                .selectAll("line")
                .data(new Array(Math.ceil(factHeight / scale / 10)))
                .enter()
                .append("text")
                .text(function(d, i) {
                    return i * scale * 100;
                })
                .attr("dy", "1em")
                .style("font-size", "12px")
                .style("fill", "#fff")
                .attr("stroke", "null")
                .attr("font-weight", "100")
                .attr("transform", function(d, i) {
                    return "translate(15, " + (verticalScale(i * scale * 100) + 5) + ") rotate(90)";
                });
            // 垂直方向的刻度 end
        },
        changeLinePox(type, index, $event) {
            let _self = this;
            let posX = $event.clientX;
            let posY = $event.clientY;

            _self.moveLine = { type, index};
            
            document.body.onmousemove = function(event) {
                if (type === "horizontal") {
                    if (!_self.horizontalScaleReverse) return;
                    let temp = _self.ruleLines.horizontal[index] + _self.horizontalScaleReverse(event.clientY - posY);
                    if (temp % 5 === 0) {
                        // prefect
                    } else if (temp % 5 < 1) {
                        temp = Math.ceil(temp) - 1;
                    } else if (temp % 5 > 4) {
                        temp = Math.floor(temp) + 1;
                    } else {
                        temp = Math.round(temp);
                    }
                    _self.ruleLines.horizontal.splice(index, 1, temp);
                } else if (type === "vertical") {
                    if (!_self.verticalScaleReverse) return;
                    let temp = _self.ruleLines.vertical[index] + _self.verticalScaleReverse(event.clientX - posX);
                    if (temp % 5 === 0) {
                        // prefect
                    } else if (temp % 5 < 1) {
                        temp = Math.ceil(temp) - 1;
                    } else if (temp % 5 > 4) {
                        temp = Math.floor(temp) + 1;
                    } else {
                        temp = Math.round(temp);
                    }
                    _self.ruleLines.vertical.splice(index, 1, temp);
                }
                posX = event.clientX;
                posY = event.clientY;
            };
            document.body.onmouseup = function(event) {
                _self.moveLine = {};
                document.body.onmousemove = null;
                document.body.onmouseup = null;
            };
        }
    },
    created() {},
    mounted() {
        let _self = this;
        _self.preHeight = _self.$el.offsetHeight;
        _self.drawTicks();
    }
};
</script>

<style scoped>
.ruler-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.ruler-wrapper .horizontal-container {
    width: 100%;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #939393;
}
.ruler-wrapper .vertical-container {
    width: 30px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #939393;
}
.ruler-wrapper .corner {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #7f7f7f;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ruler-wrapper .corner a {
    color: #fff;
    cursor: pointer;
}
.ruler-wrapper .ruler-line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
}
.ruler-wrapper .ruler-line.horizontal {
    width: 100%;
    height: 3px;
    border-top: 1px solid red;
    cursor: ns-resize;
}
.ruler-wrapper .ruler-line.horizontal.temp {
    border-top: 1px dashed red;
}
.ruler-wrapper .ruler-line.vertical {
    width: 3px;
    height: 100%;
    border-left: 1px solid red;
    cursor: ew-resize;
}
.ruler-wrapper .ruler-line.vertical.temp {
    border-left: 1px dashed red;
}
.ruler-wrapper .ruler-line span {
    display: inline-block;
    font-size: 12px;
    color: #aaa;
    position: relative;
    user-select: none;
}
.ruler-wrapper .ruler-line.horizontal span {
    transform-origin: 10px 10px;
    transform: rotate(90deg);
    top: 0;
    left: 28px;
}
.ruler-wrapper .ruler-line.vertical span {
    top: 28px;
    left: 5px;
}
.ruler-wrapper .ruler-line.temp {
    z-index: 100;
}
.ruler-wrapper .ruler-line.temp span {
    background-color: #008ff8;
    color: #fff;
}
</style>
