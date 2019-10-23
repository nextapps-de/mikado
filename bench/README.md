<h1>Benchmark of Template Rendering</h1>

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#internal">https://raw.githack.com/nextapps-de/mikado/master/bench/#internal</a><br>

There are 3 kinds of test scenarios:

<table>
    <tr>
        <td>1.&nbsp;non-keyed</td>
        <td>In this mode all existing nodes could be reused (recycling nodes).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>2.&nbsp;keyed</td>
        <td>In this mode just existing nodes with the same key (ID) could be reused. Re-arrangement / reconcile is a rare implemented but also strong feature which is explicitly covered by the test "order".</td>
    </tr>
    <tr></tr>
    <tr>
        <td>3.&nbsp;data-driven</td>
        <td>This mode runs through the same internal pool of data (same references, no new data from external or by creation) and compares the performance of data-driven paradigm. Especially the test "update" and "repaint" covers the strength of this mode.</td>
    </tr>
</table>

Weather a library provides optimizations to one of these modes or not, it is fair to compare each of them in a different scenario.

#### Keyed

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>30</sub></td>
        <td align=right><sub>17604</sub></td>
        <td align=right><sub>7635</sub></td>
        <td align=right><sub>75998</sub></td>
        <td align=right><sub>22272</sub></td>
        <td align=right><sub>245380</sub></td>
        <td align=right><sub>33123</sub></td>
        <td align=right><sub>27130</sub></td>
        <td align=right><sub>30645</sub></td>
        <td align=right><sub>25168</sub></td>
        <td align=right><b><sub>995</sub></b></td>
        <td align=right><b><sub>50625</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>305</sub></td>
        <td align=right><sub>744</sub></td>
        <td align=right><sub>721</sub></td>
        <td align=right><sub>5219</sub></td>
        <td align=right><sub>4111</sub></td>
        <td align=right><sub>5869</sub></td>
        <td align=right><sub>1365</sub></td>
        <td align=right><sub>5554</sub></td>
        <td align=right><sub>2356</sub></td>
        <td align=right><sub>13924</sub></td>
        <td align=right><b><sub>195</sub></b></td>
        <td align=right><b><sub>2917</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>248</sub></td>
        <td align=right><sub>641</sub></td>
        <td align=right><sub>635</sub></td>
        <td align=right><sub>4127</sub></td>
        <td align=right><sub>3280</sub></td>
        <td align=right><sub>4821</sub></td>
        <td align=right><sub>1137</sub></td>
        <td align=right><sub>6372</sub></td>
        <td align=right><sub>2007</sub></td>
        <td align=right><sub>11735</sub></td>
        <td align=right><b><sub>182</sub></b></td>
        <td align=right><b><sub>2543</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>420</sub></td>
        <td align=right><sub>1109</sub></td>
        <td align=right><sub>1051</sub></td>
        <td align=right><sub>1047</sub></td>
        <td align=right><sub>1052</sub></td>
        <td align=right><sub>1042</sub></td>
        <td align=right><sub>1157</sub></td>
        <td align=right><sub>1866</sub></td>
        <td align=right><sub>1387</sub></td>
        <td align=right><sub>25400</sub></td>
        <td align=right><b><sub>221</sub></b></td>
        <td align=right><b><sub>1400</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>485</sub></td>
        <td align=right><sub>973</sub></td>
        <td align=right><sub>959</sub></td>
        <td align=right><sub>949</sub></td>
        <td align=right><sub>979</sub></td>
        <td align=right><sub>987</sub></td>
        <td align=right><sub>975</sub></td>
        <td align=right><sub>1896</sub></td>
        <td align=right><sub>1123</sub></td>
        <td align=right><sub>26551</sub></td>
        <td align=right><b><sub>162</sub></b></td>
        <td align=right><b><sub>1290</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>567</sub></td>
        <td align=right><sub>923</sub></td>
        <td align=right><sub>799</sub></td>
        <td align=right><sub>815</sub></td>
        <td align=right><sub>820</sub></td>
        <td align=right><sub>828</sub></td>
        <td align=right><sub>894</sub></td>
        <td align=right><sub>1454</sub></td>
        <td align=right><sub>1129</sub></td>
        <td align=right><sub>22271</sub></td>
        <td align=right><b><sub>165</sub></b></td>
        <td align=right><b><sub>1094</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>710</sub></td>
        <td align=right><sub>814</sub></td>
        <td align=right><sub>796</sub></td>
        <td align=right><sub>780</sub></td>
        <td align=right><sub>763</sub></td>
        <td align=right><sub>778</sub></td>
        <td align=right><sub>804</sub></td>
        <td align=right><sub>1571</sub></td>
        <td align=right><sub>1039</sub></td>
        <td align=right><sub>19765</sub></td>
        <td align=right><b><sub>170</sub></b></td>
        <td align=right><b><sub>1058</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>741</sub></td>
        <td align=right><sub>757</sub></td>
        <td align=right><sub>706</sub></td>
        <td align=right><sub>694</sub></td>
        <td align=right><sub>691</sub></td>
        <td align=right><sub>686</sub></td>
        <td align=right><sub>751</sub></td>
        <td align=right><sub>1222</sub></td>
        <td align=right><sub>834</sub></td>
        <td align=right><sub>5344</sub></td>
        <td align=right><b><sub>89</sub></b></td>
        <td align=right><b><sub>813</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1180</sub></td>
        <td align=right><sub>427</sub></td>
        <td align=right><sub>432</sub></td>
        <td align=right><sub>424</sub></td>
        <td align=right><sub>426</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>436</sub></td>
        <td align=right><sub>825</sub></td>
        <td align=right><sub>580</sub></td>
        <td align=right><sub>12448</sub></td>
        <td align=right><b><sub>162</sub></b></td>
        <td align=right><b><sub>717</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1093</sub></td>
        <td align=right><sub>408</sub></td>
        <td align=right><sub>399</sub></td>
        <td align=right><sub>403</sub></td>
        <td align=right><sub>406</sub></td>
        <td align=right><sub>404</sub></td>
        <td align=right><sub>420</sub></td>
        <td align=right><sub>716</sub></td>
        <td align=right><sub>550</sub></td>
        <td align=right><sub>4580</sub></td>
        <td align=right><b><sub>82</sub></b></td>
        <td align=right><b><sub>542</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4568</sub></td>
        <td align=right><sub>153</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>156</sub></td>
        <td align=right><sub>152</sub></td>
        <td align=right><sub>155</sub></td>
        <td align=right><sub>165</sub></td>
        <td align=right><sub>295</sub></td>
        <td align=right><sub>206</sub></td>
        <td align=right><sub>1940</sub></td>
        <td align=right><b><sub>38</sub></b></td>
        <td align=right><b><sub>225</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>3135</sub></td>
        <td align=right><sub>76</sub></td>
        <td align=right><sub>62</sub></td>
        <td align=right><sub>66</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>78</sub></td>
        <td align=right><sub>120</sub></td>
        <td align=right><sub>97</sub></td>
        <td align=right><sub>1137</sub></td>
        <td align=right><b><sub>46</sub></b></td>
        <td align=right><b><sub>168</sub></b></td>
    </tr>	
</table>

#### Non-Keyed

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>27</sub></td>
        <td align=right><sub>18101</sub></td>
        <td align=right><sub>7760</sub></td>
        <td align=right><sub>73757</sub></td>
        <td align=right><sub>22797</sub></td>
        <td align=right><sub>254418</sub></td>
        <td align=right><sub>33216</sub></td>
        <td align=right><sub>27032</sub></td>
        <td align=right><sub>31020</sub></td>
        <td align=right><sub>24896</sub></td>
        <td align=right><b><sub>1000</sub></b></td>
        <td align=right><b><sub>17113</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>117</sub></td>
        <td align=right><sub>1166</sub></td>
        <td align=right><sub>5537</sub></td>
        <td align=right><sub>45071</sub></td>
        <td align=right><sub>15154</sub></td>
        <td align=right><sub>92940</sub></td>
        <td align=right><sub>2418</sub></td>
        <td align=right><sub>22124</sub></td>
        <td align=right><sub>4261</sub></td>
        <td align=right><sub>22452</sub></td>
        <td align=right><b><sub>511</sub></b></td>
        <td align=right><b><sub>5430</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>369</sub></td>
        <td align=right><sub>448</sub></td>
        <td align=right><sub>3729</sub></td>
        <td align=right><sub>23244</sub></td>
        <td align=right><sub>9539</sub></td>
        <td align=right><sub>42158</sub></td>
        <td align=right><sub>868</sub></td>
        <td align=right><sub>8255</sub></td>
        <td align=right><sub>1532</sub></td>
        <td align=right><sub>4754</sub></td>
        <td align=right><b><sub>241</sub></b></td>
        <td align=right><b><sub>2592</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>251</sub></td>
        <td align=right><sub>645</sub></td>
        <td align=right><sub>1964</sub></td>
        <td align=right><sub>4306</sub></td>
        <td align=right><sub>3190</sub></td>
        <td align=right><sub>4772</sub></td>
        <td align=right><sub>1146</sub></td>
        <td align=right><sub>6619</sub></td>
        <td align=right><sub>1935</sub></td>
        <td align=right><sub>11892</sub></td>
        <td align=right><b><sub>199</sub></b></td>
        <td align=right><b><sub>1239</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>357</sub></td>
        <td align=right><sub>430</sub></td>
        <td align=right><sub>2362</sub></td>
        <td align=right><sub>3824</sub></td>
        <td align=right><sub>3389</sub></td>
        <td align=right><sub>4494</sub></td>
        <td align=right><sub>810</sub></td>
        <td align=right><sub>6292</sub></td>
        <td align=right><sub>1418</sub></td>
        <td align=right><sub>12013</sub></td>
        <td align=right><b><sub>236</sub></b></td>
        <td align=right><b><sub>1214</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>295</sub></td>
        <td align=right><sub>765</sub></td>
        <td align=right><sub>698</sub></td>
        <td align=right><sub>5108</sub></td>
        <td align=right><sub>3971</sub></td>
        <td align=right><sub>5559</sub></td>
        <td align=right><sub>1431</sub></td>
        <td align=right><sub>5312</sub></td>
        <td align=right><sub>2239</sub></td>
        <td align=right><sub>10636</sub></td>
        <td align=right><b><sub>183</sub></b></td>
        <td align=right><b><sub>1212</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>585</sub></td>
        <td align=right><sub>1013</sub></td>
        <td align=right><sub>862</sub></td>
        <td align=right><sub>869</sub></td>
        <td align=right><sub>870</sub></td>
        <td align=right><sub>863</sub></td>
        <td align=right><sub>882</sub></td>
        <td align=right><sub>1609</sub></td>
        <td align=right><sub>1149</sub></td>
        <td align=right><sub>22221</sub></td>
        <td align=right><b><sub>145</sub></b></td>
        <td align=right><b><sub>786</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>656</sub></td>
        <td align=right><sub>956</sub></td>
        <td align=right><sub>793</sub></td>
        <td align=right><sub>814</sub></td>
        <td align=right><sub>816</sub></td>
        <td align=right><sub>806</sub></td>
        <td align=right><sub>867</sub></td>
        <td align=right><sub>1457</sub></td>
        <td align=right><sub>1113</sub></td>
        <td align=right><sub>19349</sub></td>
        <td align=right><b><sub>157</sub></b></td>
        <td align=right><b><sub>735</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>1464</sub></td>
        <td align=right><sub>163</sub></td>
        <td align=right><sub>1295</sub></td>
        <td align=right><sub>4876</sub></td>
        <td align=right><sub>2889</sub></td>
        <td align=right><sub>7585</sub></td>
        <td align=right><sub>329</sub></td>
        <td align=right><sub>2738</sub></td>
        <td align=right><sub>596</sub></td>
        <td align=right><sub>1740</sub></td>
        <td align=right><b><sub>85</sub></b></td>
        <td align=right><b><sub>710</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>680</sub></td>
        <td align=right><sub>796</sub></td>
        <td align=right><sub>759</sub></td>
        <td align=right><sub>756</sub></td>
        <td align=right><sub>774</sub></td>
        <td align=right><sub>778</sub></td>
        <td align=right><sub>769</sub></td>
        <td align=right><sub>1461</sub></td>
        <td align=right><sub>1019</sub></td>
        <td align=right><sub>15545</sub></td>
        <td align=right><b><sub>158</sub></b></td>
        <td align=right><b><sub>695</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>733</sub></td>
        <td align=right><sub>800</sub></td>
        <td align=right><sub>624</sub></td>
        <td align=right><sub>635</sub></td>
        <td align=right><sub>630</sub></td>
        <td align=right><sub>633</sub></td>
        <td align=right><sub>658</sub></td>
        <td align=right><sub>1153</sub></td>
        <td align=right><sub>840</sub></td>
        <td align=right><sub>5087</sub></td>
        <td align=right><b><sub>86</sub></b></td>
        <td align=right><b><sub>508</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2427</sub></td>
        <td align=right><sub>91</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>65</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>66</sub></td>
        <td align=right><sub>80</sub></td>
        <td align=right><sub>123</sub></td>
        <td align=right><sub>98</sub></td>
        <td align=right><sub>1053</sub></td>
        <td align=right><b><sub>47</sub></b></td>
        <td align=right><b><sub>144</sub></b></td>
    </tr>	
</table>

#### Data-Driven (Internal)

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>27</sub></td>
        <td align=right><sub>17284</sub></td>
        <td align=right><sub>7187</sub></td>
        <td align=right><sub>20029</sub></td>
        <td align=right><sub>20196</sub></td>
        <td align=right><sub>137185</sub></td>
        <td align=right><sub>29482</sub></td>
        <td align=right><sub>25343</sub></td>
        <td align=right><sub>25639</sub></td>
        <td align=right><sub>25040</sub></td>
        <td align=right><b><sub>955</sub></b></td>
        <td align=right><b><sub>25768</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>116</sub></td>
        <td align=right><sub>1038</sub></td>
        <td align=right><sub>4540</sub></td>
        <td align=right><sub>34530</sub></td>
        <td align=right><sub>12390</sub></td>
        <td align=right><sub>82202</sub></td>
        <td align=right><sub>2139</sub></td>
        <td align=right><sub>18375</sub></td>
        <td align=right><sub>3929</sub></td>
        <td align=right><sub>22862</sub></td>
        <td align=right><b><sub>543</sub></b></td>
        <td align=right><b><sub>14539</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>279</sub></td>
        <td align=right><sub>797</sub></td>
        <td align=right><sub>766</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>20483</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>1552</sub></td>
        <td align=right><sub>16508</sub></td>
        <td align=right><sub>2990</sub></td>
        <td align=right><sub>13956</sub></td>
        <td align=right><b><sub>380</sub></b></td>
        <td align=right><b><sub>2569</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>347</sub></td>
        <td align=right><sub>742</sub></td>
        <td align=right><sub>700</sub></td>
        <td align=right><sub>5011</sub></td>
        <td align=right><sub>4055</sub></td>
        <td align=right><sub>5711</sub></td>
        <td align=right><sub>1277</sub></td>
        <td align=right><sub>6738</sub></td>
        <td align=right><sub>2266</sub></td>
        <td align=right><sub>14219</sub></td>
        <td align=right><b><sub>210</sub></b></td>
        <td align=right><b><sub>2136</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>206</sub></td>
        <td align=right><sub>956</sub></td>
        <td align=right><sub>802</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>13723</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>1775</sub></td>
        <td align=right><sub>13084</sub></td>
        <td align=right><sub>3262</sub></td>
        <td align=right><sub>23738</sub></td>
        <td align=right><b><sub>357</sub></b></td>
        <td align=right><b><sub>2249</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>288</sub></td>
        <td align=right><sub>641</sub></td>
        <td align=right><sub>615</sub></td>
        <td align=right><sub>4147</sub></td>
        <td align=right><sub>3281</sub></td>
        <td align=right><sub>4768</sub></td>
        <td align=right><sub>1115</sub></td>
        <td align=right><sub>6242</sub></td>
        <td align=right><sub>1982</sub></td>
        <td align=right><sub>11814</sub></td>
        <td align=right><b><sub>190</sub></b></td>
        <td align=right><b><sub>1841</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>491</sub></td>
        <td align=right><sub>1010</sub></td>
        <td align=right><sub>975</sub></td>
        <td align=right><sub>960</sub></td>
        <td align=right><sub>854</sub></td>
        <td align=right><sub>859</sub></td>
        <td align=right><sub>859</sub></td>
        <td align=right><sub>1683</sub></td>
        <td align=right><sub>1149</sub></td>
        <td align=right><sub>26727</sub></td>
        <td align=right><b><sub>165</sub></b></td>
        <td align=right><b><sub>1012</sub></b></td>
    </tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>593</sub></td>
        <td align=right><sub>794</sub></td>
        <td align=right><sub>701</sub></td>
        <td align=right><sub>688</sub></td>
        <td align=right><sub>630</sub></td>
        <td align=right><sub>637</sub></td>
        <td align=right><sub>687</sub></td>
        <td align=right><sub>1103</sub></td>
        <td align=right><sub>836</sub></td>
        <td align=right><sub>5613</sub></td>
        <td align=right><b><sub>93</sub></b></td>
        <td align=right><b><sub>648</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1001</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>430</sub></td>
        <td align=right><sub>427</sub></td>
        <td align=right><sub>425</sub></td>
        <td align=right><sub>425</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>814</sub></td>
        <td align=right><sub>579</sub></td>
        <td align=right><sub>12155</sub></td>
        <td align=right><b><sub>163</sub></b></td>
        <td align=right><b><sub>613</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1264</sub></td>
        <td align=right><sub>432</sub></td>
        <td align=right><sub>399</sub></td>
        <td align=right><sub>399</sub></td>
        <td align=right><sub>401</sub></td>
        <td align=right><sub>403</sub></td>
        <td align=right><sub>416</sub></td>
        <td align=right><sub>751</sub></td>
        <td align=right><sub>539</sub></td>
        <td align=right><sub>4605</sub></td>
        <td align=right><b><sub>82</sub></b></td>
        <td align=right><b><sub>440</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>1573</sub></td>
        <td align=right><sub>85</sub></td>
        <td align=right><sub>63</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>115</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>132</sub></td>
        <td align=right><sub>344</sub></td>
        <td align=right><sub>200</sub></td>
        <td align=right><sub>1077</sub></td>
        <td align=right><b><sub>61</sub></b></td>
        <td align=right><b><sub>203</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4820</sub></td>
        <td align=right><sub>162</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>153</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>162</sub></td>
        <td align=right><sub>275</sub></td>
        <td align=right><sub>206</sub></td>
        <td align=right><sub>1855</sub></td>
        <td align=right><b><sub>38</sub></b></td>
        <td align=right><b><sub>184</sub></b></td>
    </tr>	
</table>

#### Test goal
This stress test focuses a real life use case, where new data is coming from a source to be rendered through a template (e.g. from a server or by creation during runtime). The different to other benchmark implementations is, that the given task is not known before the data was available.

This test measures the raw rendering performance. If you look for a benchmark which covers more aspects goto here:<br>
https://krausest.github.io/js-framework-benchmark/current.html

#### Local Installation

Go to the folder _bench/_ and install dependencies:
```cmd
npm install
```

Start local webserver:
```cmd
npm run server
```

Go to the URL which displays in the console, e.g. _http://localhost_. The tests will start automatically. Results may differ through various browsers and OS.

#### Score
The score is calculated in relation to the median value of each test. That will keeping the benchmark factor between each library effectively but also vary relationally when new libraries were added.

<code>Score = Sum<sub>test</sub>(lib_ops / median_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

#### Index
The score index is a very stable representation where each score points to a specific place in a ranking table. The maximum possible score and also the best place is 1000, that requires a library to be best in each category (regardless of how much better the factor is, that's the difference to the score value).

<code>Index = Sum<sub>test</sub>(lib_ops / max_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

## Tests
<table>
    <tr></tr>
    <tr>
        <td>Test</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>KB</td>
        <td>The size of the library. This value has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>RAM</td>
        <td>The amount of memory which was allocated through the whole test (memory per cycle). This value also has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Create</td>
        <td>The creation of 100 elements from blank.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Replace</td>
        <td>The replacement of 100 new elements over 100 existing elements.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Update</td>
        <td>Update content fields (order of items stay unchanged).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Arrange</td>
        <td>Test re-arrangement, all contents stay unchanged. Toggles between:<br>1. swap second and fore-last item<br>2. re-arrange (4 shifted groups)<br>3. shuffle (on every 5th loop)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Repaint</td>
        <td>Render same items in the same order.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Remove</td>
        <td>The remove of 50 items from a list of 100.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Append</td>
        <td>Append 50 new items to a list of 50 existing.</td>
    </tr>   
    <tr></tr>
    <tr>
        <td>Toggle</td>
        <td>Toggles between "Remove" and "Append" (test for optimizations like: pagination, content folding, list resizing).</td>
    </tr>  
    <tr></tr>
    <tr>
        <td>Clear</td>
        <td>Remove all items from a list of 100 existing.</td>
    </tr>  
</table>

<a name="details"></a>
## How this benchmark work

Basically each framework provide one public method, which handles and render the incoming data, e.g.:

```js
suite["domc"] = function(items){
    scope.items = items;
    root.update(scope);
};
```

or

```js
suite["sinuous"] = function(items){
    data(items);
};
```

The data is unknown, the library does not know if data was added, removed, updated or stay unchanged before it gets the data. That's the main different to other benchmark implementations, where a programmer can iteratively solve a problem to a known task.

Regardless the function is doing, every test has to run through the same logic.

#### Random item factory

The items were created by a random factory. The items comes from a pre-filled pool (5 slots a 100 items), so that keyed libraries get a chance to match same IDs.

Also the items has some fields, which aren't included by the template. That is also important, because in this situation is the most common. Most other benchmarks just provide data which is consumed by the template.

#### Mimic data from a server or created during runtime

The items will be cloned before every test to mimic a fresh fetch from the server or the creation of new items during runtime. The "data-driven" mode disables cloning and perform changes over and over through the same data.

#### Dedicated sandbox

Each test suite runs in its own dedicated sandbox through an iframe. This is reducing noise from externals to a minimum.

#### Hidden render target

You may see benchmarks which draws the rendering visible to the users screen. It depends on what is the desired part to benchmark. This benchmark will just cover the raw time of applied re-calculations (creation/updating/removing of elements), the time the browser takes to make them visible is:

1. no part of this test
2. not relevant, because this time is almost not influenced by the library
3. introduce unnecessary distortion to the test

#### About requirements for tested libraries
1. Each library should provide at least its own features to change DOM. A test implementation should not force to implement something like `node.nodeValue = "..."` or `node.className = "..."` by hand.
The goal is to benchmark library performance and not the performance made by an implementation of a developer. That is probably the biggest different to other benchmark tests.

2. Also asynchronous/scheduled rendering is not allowed.

3. The keyed test requires a largely non-reusing paradigm. When a new item comes from the outside, the library does not reusing nodes (on different keys/IDs).

#### About the test environment

This test also covers runtime optimizations of each library which is very important to produce meaningful results.

<!--
Other benchmarks may re-loading the whole page/application after every single test loop. This would be a good step away from a real environment and also cannot cover one of the biggest strength of Mikado which is based on several runtime optimizations.
-->

#### About median values
Using the median value is very common to normalize the spread in results in a statistically manner. But using the median as benchmark samples, especially when code runs through a VM, the risk is high that the median value is getting back a false result. One thing that is often overseen is the run of the garbage collector, which has a significantly cost and runs randomly. A benchmark which is based on median results will effectively cut out the garbage collector and may produce wrong results. A benchmark based on a best run will absolutely cut off the garbage collector.

This test implementation just using a median to map the results into a normalized scoring index. The results are based on the full computation time including the full run of the garbage collector. That also comes closest to a real environment.

#### About benchmark precision
It is not possible to provide absolute stable browser measuring. There are so many factors which has an impact of benchmarking that it makes no sense in trying to make "synthetic" fixes on things they cannot been fixed. Also every synthetic change may lead into wrong results and false interpreting. For my personal view the best benchmark just uses the browser without any cosmetics. That comes closest to the environment of an user who is using an application.

<!--
That all just become more complex when doing micro-benchmarking. Luckily this workload is by far big enough to produces stable results. Tests where shuffled before start, so you can proof by yourself that values of course differ from one run to another, but produce very stable results. Especially the ___index___ row provides you one of the most stable ranking indexes (the more stable a test is the more meaningful it is). There is absolutely no need for using benchmark.js especially for this workload, also it absolutely does not fit into a real live environment. No place for statistical nonsense, this isn't politics.
-->