<Home>
    <div class="page">
        <h5>{hello}</h5>
    </div>
    <script>
        import {log} from '../componet/utils';

        this.hello = 'hello world';
        this.on('mount',  () => {
            log({
                etype: 'h5'
            })
        })
    </script>
    <style scoped type="less">
        @base: 40rem;
        
        .page {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: #333;
            font-weight: bold;
        }
    </style>
</Home>
