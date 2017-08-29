<!--
	改按钮背景色传入backcolor,暂时有
		蓝色
		绿色
		红色
-->
<!-- 禁用按钮传入disabled -->
<!-- 按钮大小传入size -->
<!-- 内容直接覆盖slot -->

<template>
	<div class="sx-button">
		<button class="button" :class="[{
							'button-disabled': disabled,
							'button-success': backcolor === 'success',
							'button-danger': backcolor === 'danger',
							'button-blue': backcolor === 'blue',
							'button-normal': size === 'normal',
							'button-small': size === 'small'
						}]" :disabled="disabled" @click="handleClick()">
			<span>
				<slot>确定</slot>
			</span>
		</button>
	</div>
</template>
<script>
export default {
  props: {
    disabled: Boolean,
    backcolor: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../common/sass/theme";

.sx-button {
	display: flex;
	justify-content: center;
	&:hover{
		opacity: 0.9
	}
	.button {
		border-radius: 20px;
		border: 0;
		box-sizing: border-box;
		color: inherit;
		display: block;
		font-size: 18px;
		height: 40px;
		outline: 0;
		overflow: hidden;
		text-align: center;
		position: relative;
		color: #ffffff;
		width: 100%;
		&:active {
			opacity: .9;
		}
	}
	.button-success {
		background-color: $buttonSuccess;
	}
	.button-danger {
		background-color: $buttonDanger;
	}
	.button-disabled {
		opacity: .5;
	}
	.button-normal {
		display: inline-block;
		padding: 0 20px;
		background: linear-gradient(to right, #69cfff, #15cfff, #1892ed);;
	}
	.button-blue{
		background-color: $buttonBlue;
	}
	.button-small {
		display: inline-block;
		font-size: 14px;
		padding: 0 12px;
		height: 30px;
		width: inherit;
	}
}
</style>